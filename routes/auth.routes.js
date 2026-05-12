import express from "express";
import bcrypt from "bcryptjs";

import {login,register, getUsers,refreshToken } from "../controllers/auth.controller.js";
import passport from "passport";

const router = express.Router();

router.post("/login", login);

router.get("/refresh", refreshToken);

router.post("/register", register);

router.get("/getUsers",
    passport.authenticate("jwt", { session: false }),
    getUsers
);

// router.get("/getRoles",
//     passport.authenticate("jwt", { session: false }),
//     getRoles)


router.post("/logout", async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        // if (token) {
        //     await RefreshToken.deleteOne({ token });
        // }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "none",
            secure: true, // true en prod
        });

        res.sendStatus(204);
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ error: "Logout failed" });
    }
});

router.post(
    "/change-password",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const hash = await bcrypt.hash(req.body.password, 10);

        await User.findByIdAndUpdate(req.user._id, {
            password: hash,
            firstLogin: false,
        });

        res.sendStatus(204);
    }
);

export default router;
