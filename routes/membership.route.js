import express from "express";
import passport from "passport";

import {
    createMembershipRequest,
    getMemberships,
    getMembershipById,
    updateMembership,
    generateMembershipPDF
} from "../controllers/membership.controller.js";
import path from "path";

const router = express.Router();

router.post(
    "/createMembershipRequest",
    //passport.authenticate("jwt", { session: false }),
    //upload.array("attachments", 5),
    //uploadErrorHandler,
    createMembershipRequest
);
//get all current data from main table of memberships
router.get("/getMemberships",
    // passport.authenticate("jwt", { session: false }),
    getMemberships
);
//generate membership PDF

router.get("/pdf/:id",
    generateMembershipPDF);

// router.get("/:id",
//     passport.authenticate("jwt", { session: false }),
//     showTickets)

// router.get(
//     "/attachments/:filename",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//
//         const filePath = path.join(
//             process.cwd(),
//             "uploads",
//             req.params.filename
//         );
//
//         res.download(filePath);
//     }
// );

router.get("/edit/:id", getMembershipById);
router.put("/:id", updateMembership);

export default router;
