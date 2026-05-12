import express from "express";
import passport from "passport";
import {getCatalogs} from "../controllers/catalog.controller.js";

const router = express.Router();


router.get("/", getCatalogs);


export default router;