import { pdf } from "@react-pdf/renderer";
import React from "react";
import fs from "fs";
import path from "path";
import { MembershipPDFTemplate } from "./pdfMembershipTemplate.js";
import { logoBase64 } from "./pdfAssets.js";

export const generatePDF = async (data) => {
    try {

        const document = React.createElement(
            MembershipPDFTemplate,
            {
                data,
                logo: logoBase64
            }
        );

        const instance = pdf(document);

        // esto devuelve stream
        const stream = await instance.toBuffer();

        const chunks = [];

        return await new Promise((resolve, reject) => {
            stream.on("data", chunk => chunks.push(chunk));
            stream.on("end", () => resolve(Buffer.concat(chunks)));
            stream.on("error", reject);
        });

    } catch (error) {
        console.error("PDF Error:", error);
        throw error;
    }
};