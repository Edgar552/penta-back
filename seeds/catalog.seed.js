//import 'dotenv/config';
import mongoose from "mongoose";
import Catalog from "../models/CatalogModel.js";

await mongoose.connect(process.env.MONGO_URI);

await Catalog.insertMany([
    //TICKET STATUS CATALOG ------------------------------------------------------------------------------
    {
        type: "ticket_status",
        key: "OPEN",
        label: "Open",
        isDefault: true,
        order: 1,
    },
    {
        type: "ticket_status",
        key: "IN_PROGRESS",
        label: "In Progress",
        order: 2,
    },
    {
        type: "ticket_status",
        key: "CLOSED",
        label: "Closed",
        order: 3,
    },
//TICKET PRIORITY CATALOG ------------------------------------------------------------------------------
    {
        type: "ticket_priority",
        key: "LOW",
        label: "Low",
        order: 1,
    },
    {
        type: "ticket_priority",
        key: "MEDIUM",
        label: "Medium",
        order: 2,
    },
    {
        type: "ticket_priority",
        key: "HIGH",
        label: "High",
        order: 3,
    },
    {
        type: "ticket_priority",
        key: "CRITICAL",
        label: "Critical",
        order: 4,
    },
    //TICKET LOCATION CATALOG ------------------------------------------------------------------------------
    {
        type: "ticket_location",
        key: "AUCKLAND",
        label: "Auckland",

    },
    {
        type: "ticket_location",
        key: "CHICAGO",
        label: "Chicago",

    },
    {
        type: "ticket_location",
        key: "CHINA",
        label: "China",

    },
    {
        type: "ticket_location",
        key: "DALLAS",
        label: "Dallas",

    },
    {
        type: "ticket_location",
        key: "DALLAS_DFW01",
        label: "Dallas - DFW01",

    },
    {
        type: "ticket_location",
        key: "DALLAS_DFW06",
        label: "Dallas - DFW06",

    },
    {
        type: "ticket_location",
        key: "DUBLIN",
        label: "Dublin",

    },
    {
        type: "ticket_location",
        key: "INDONESIA",
        label: "Indonesia",

    },
    {
        type: "ticket_location",
        key: "JAPAN",
        label: "Japan",

    },
    {
        type: "ticket_location",
        key: "Norwood",
        label: "Norwood",

    },
    {
        type: "ticket_location",
        key: "POLAND",
        label: "Poland",

    },
    {
        type: "ticket_location",
        key: "RUGBY",
        label: "Rugby",

    },
    {
        type: "ticket_location",
        key: "SINGAPORE",
        label: "Singapore",

    },
    {
        type: "ticket_location",
        key: "SLP",
        label: "SLP",

    },
    {
        type: "ticket_location",
        key: "SOUTH_AFRICA",
        label: "South Africa",

    },
    {
        type: "ticket_location",
        key: "SYDNEY",
        label: "Sydney",

    },
    {
        type: "ticket_location",
        key: "TORONTO",
        label: "Toronto",

    },
    {
        type: "ticket_location",
        key: "UD30",
        label: "UD30",

    },
    {
        type: "ticket_location",
        key: "OTHER",
        label: "Other",

    },
]);

console.log("Catalogs seeded successfully.");
process.exit();