import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import catalogRoutes from "./routes/catalog.routes.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import membershipRoute from "./routes/membership.route.js";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 8081;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/
app.use(cors({
    origin:
        process.env.NODE_ENV === "production"
            ? "https://back.pdmuslp.com"
            : "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
configurePassport(passport);

/*
|--------------------------------------------------------------------------
| DB
|--------------------------------------------------------------------------
*/
async function connectDB() {
    try {
        await prisma.$connect();
        console.log("Conectado a MySQL con Prisma");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

/*
|--------------------------------------------------------------------------
| Static uploads
|--------------------------------------------------------------------------
*/
app.use("/uploads", express.static("uploads"));

/*
|--------------------------------------------------------------------------
| API routes
|--------------------------------------------------------------------------
*/
app.use("/auth", authRoutes);
app.use("/api/memberships", membershipRoute);
app.use("/api/catalogs", catalogRoutes);

/*
|--------------------------------------------------------------------------
| SOLO producción → servir React build
|--------------------------------------------------------------------------
*/
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "backend running"
    });
});
if (process.env.NODE_ENV === "production") {
    app.use(
        express.static(
            path.join(__dirname, "../client/dist")
        )
    );

    app.get("*", (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "../client/dist/index.html"
            )
        );
    });
}

/*
|--------------------------------------------------------------------------
| Dev fallback
|--------------------------------------------------------------------------
*/
if (process.env.NODE_ENV !== "production") {
    app.get("/", (req, res) => {
        res.send("API running...");
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});