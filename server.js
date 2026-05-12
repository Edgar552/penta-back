// import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from "passport";
import cookieParser from "cookie-parser";

import catalogRoutes from "./routes/catalog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import membershipRoute from "./routes/membership.route.js";

import configurePassport from "./config/passport.js";

import prisma from "./lib/prisma.js";

const app = express();

const PORT = process.env.PORT || 8081;

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/
const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? [
            "https://pdmuslp.com",
            "https://www.pdmuslp.com"
        ]
        : [
            "http://localhost:3001"
        ];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("CORS not allowed")
            );
        },
        credentials: true
    })
);

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

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
        console.error("Error DB:", error);
        process.exit(1);
    }
}

/*
|--------------------------------------------------------------------------
| Static uploads
|--------------------------------------------------------------------------
*/
// app.use("/uploads", express.static("uploads"));

/*
|--------------------------------------------------------------------------
| Health check
|--------------------------------------------------------------------------
*/
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "backend running"
    });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
app.use("/auth", authRoutes);
app.use("/api/memberships", membershipRoute);
app.use("/api/catalogs", catalogRoutes);

/*
|--------------------------------------------------------------------------
| Root route
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
    res.json({
        message: "API running"
    });
});

/*
|--------------------------------------------------------------------------
| 404 fallback API
|--------------------------------------------------------------------------
*/
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

/*
|--------------------------------------------------------------------------
| Start server
|--------------------------------------------------------------------------
*/
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});