//import 'dotenv/config';
import mongoose from "mongoose";
import TicketType from "../models/TicketTypeModel.js";

await mongoose.connect(process.env.MONGO_URI);

await TicketType.insertMany([
    //TICKET label CATALOG ------------------------------------------------------------------------------
    {
        label: "Orion",
        active: "1"
    },
    {

        label: "Website",
        active: "1"
    },
    {
        label: "Internet Access",
        active: "1"
    },
    {
        label: "Access Rights",
        active: "1"
    },
    {

        label: "Password",
        active: "1"
    },
    {
        label: "Purchase Requests",
        active: "1"
    },
    {
        label: "Network",
        active: "1"
    },
    {
        label: "Email",
        active: "1"
    },
    {
        label: "File Server",
        active: "1"
    },
    {
        label: "Vault",
        active: "1"
    },
    {
        label: "Workstation",
        active: "1"
    },
    {
        label: "Phone",
        active: "1"
    },
    {
        label: "Starquery",
        active: "1"
    },
    {
        label: "Other",
        active: "1"
    },
    {
        label: "Application",
        active: "1"
    },
    {
        label: "Copier",
        active: "1"
    },
    {
        label: "Cell Phone",
        active: "1"
    },
    {

        label: "Feature Request",
        active: "1"
    },
    {

        label: "Application -> Egnyte",
        active: "1"
    },
    {
        label: "Application -> eTech",
        active: "1"
    },
    {
        label: "Application -> HKI Online",
        active: "1"
    },
    {
        label: "Application -> IPM",
        active: "1"
    },
    {
        label: "Application -> MS Office",
        active: "1"
    },
    {
        label: "Application -> Other",
        active: "1"
    },
    {
        label: "Application -> TSM",
        active: "1"
    },
    {

        label: "Application -> Warranty",
        active: "1"
    },
    {

        label: "User -> New User",
        active: "1"
    },
    {
        label: "Orion -> Amendment Request",
        active: "1"
    },
    {
        label: "User",
        active: "1"
    },
    {
        label: "User -> Remove User",
        active: "1"
    },
    {
        label: "Web Development Team",
        active: "1"
    },
    {
        label: "Application -> Dynamics-AX",
        active: "1"
    },
    {
        label: "Merge",
        active: "1"
    },
    {

        label: "Equipment Lending",
        active: "1"
    },
    {
        label: "Application -> Diver",
        active: "1"
    },
    {
        label: "Application -> WMS",
        active: "1"
    },
    {
        label: "Application -> WMS API",
        active: "1"
    },
    {
        label: "Scanner -> Android",
        active: "1"
    },
    {
        label: "Scanner -> Apple",
        active: "1"
    },
    {
        label: "Scanner",
        active: "1"
    },
    {
        label: "Scanner -> Bluetooth",
        active: "1"
    },
    {
        label: "Printer",
        active: "1"
    },
    {
        label: "Printer -> Hip Printer",
        active: "1"
    },
    {
        label: "IT Hub",
        active: "1"
    },
    {
        label: "IT Security",
        active: "1"
    },
    {
        label: "IT Security -> Egnyte",
        active: "1"
    },
    {
        label: "IT Security -> Application assessment request",
        active: "1"
    },
    {
        label: "Application -> Online Orders",
        active: "1"
    },
    {
        label: "Knowledge Base",
        active: "1"
    }
]);

console.log("Catalogs labels Added successfully.");
process.exit();