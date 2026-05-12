import { PASSWORD_WORDS } from "./pswWords.js";
import crypto from "crypto";

export function generateTempPassword() {
    const word =
        PASSWORD_WORDS[
            Math.floor(Math.random() * PASSWORD_WORDS.length)
            ];

    const number = crypto.randomInt(100, 999);

    return `${word}-${number}`;
}
