import express from "express";
import { getTicketsTypeController } from "../controllers/ticketsType.controller.js";
import passport from "passport";

const router = express.Router();

router.get("/ticket_types", passport.authenticate("jwt", { session: false }),getTicketsTypeController);

export default router