import { buildMembershipHTML } from "./pdfMembershipTemplate.js";
import html_to_pdf from "html-pdf-node";
import fs from "fs";
import path from "path";
export const generatePDF = async (data) => {
    try {

        //PDF logo
        const logoPath = path.join(process.cwd(), "public/logo.png");

        const logoBase64 = fs.readFileSync(logoPath, {
            encoding: "base64"
        });

        const html = buildMembershipHTML(data,logoBase64);

        const file = {
            content: html
        };

        const options = {
            format: "A4",
            printBackground: true
        };

        const pdfBuffer = await html_to_pdf.generatePdf(
            file,
            options
        );

        return pdfBuffer;

    } catch (error) {
        console.error("PDF Error:", error);
        throw error;
    }
};