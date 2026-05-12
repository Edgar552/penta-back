import { getBrowser } from "../lib/puppeteer.js";
import { buildMembershipHTML } from "./pdfMembershipTemplate.js";
import fs from "fs";
import path from "path";
export const generatePDF = async (data) => {
    const browser = await getBrowser();

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (req) => {
        if (["image", "font"].includes(req.resourceType())) {
            return req.abort();
        }
        req.continue();
    });
//PDF logo
    const logoPath = path.join(process.cwd(), "public/logo.png");

    const logoBase64 = fs.readFileSync(logoPath, {
        encoding: "base64"
    });

    const html = buildMembershipHTML(data,logoBase64);

    await page.setContent(html, {
        waitUntil: "domcontentloaded"
    });

    const pdf = await page.pdf({
        format: "Letter",
        printBackground: true,
        scale: 0.95
    });

    await page.close(); // to close the request

    return pdf;
};