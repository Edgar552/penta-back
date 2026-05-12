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

        return await pdf(document).toBuffer();

    } catch (error) {
        console.error("PDF Error:", error);
        throw error;
    }
};