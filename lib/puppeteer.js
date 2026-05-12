import puppeteer from "puppeteer-core";

let browser = null;

export const getBrowser = async () => {
    if (browser) return browser;

    browser = await puppeteer.launch({
        headless: "new",
        executablePath: process.env.CHROME_PATH,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-zygote",
            "--single-process"
        ]
    });

    console.log("🚀 Puppeteer iniciado");

    return browser;
};