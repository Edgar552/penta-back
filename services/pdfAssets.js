import fs from "fs";
import path from "path";

const logoPath = path.join(process.cwd(), "public/logo.png");

export const logoBase64 =
    "data:image/png;base64," +
    fs.readFileSync(logoPath, {
        encoding: "base64"
    });