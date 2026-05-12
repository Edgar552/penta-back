//import 'dotenv/config';
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateTempPassword } from "../utils/tempPsw.js";

import jwt from "jsonwebtoken";
import {sendTempPasswordEmail} from "../services/mailer.js";

const createAccessToken = user =>
    jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
        expiresIn: "4h",
    });

const createRefreshToken = user =>
    jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });

export const login = async (req, res) => {
    const { email, password } = req.body || {};

    const user = await prisma.users.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,// true in prod
    });

    res.json({
       accessToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    });
};

export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.sendStatus(401);

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await prisma.users.findUnique({
            where: { id: Number(payload.sub) }
        });

        if (!user) return res.sendStatus(401);

        const accessToken = createAccessToken(user);


        res.json({
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
        });

    } catch (err) {
        res.sendStatus(403);
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, locations, roles } = req.body;

        if (!name || !email || !locations || !roles || !roles.length) {
            return res.status(400).json({
                error: "Name, email, location and roles required",
            });
        }

        const tempPassword = generateTempPassword();

        const existing = await prisma.users.findUnique({
            where: { email }
        });

        if (existing) {
            return res.status(409).json({
                error: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        try {
            await sendTempPasswordEmail({
                to: email,
                name,
                tempPassword,
            });
        } catch (err) {
            console.error("EMAIL FAILED:", err);

            await prisma.users.delete({
                where: { id: user.id }
            });

            return res.status(500).json({
                error: "User created but email failed",
            });
        }

        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                locations: user.locations,
                roles: user.roles,
            },
        });

    } catch (err) {
        console.error("Register error:", err);

        res.status(500).json({
            error: err.message,
        });
    }
};

export const getUsers = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;

    try {
        const [users, total] = await Promise.all([
            prisma.users.findMany({
                skip,
                take: limit,
                orderBy: { id: "desc" },
            }),
            prisma.users.count()
        ]);

        res.json({
            data: users,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("refreshToken");
    res.sendStatus(204);
};
