//import 'dotenv/config';
import mongoose from "mongoose";
import RoleModel from "../models/RoleModel.js";

await mongoose.connect(process.env.MONGO_URI);

await RoleModel.insertMany([
    //Roles label CATALOG ------------------------------------------------------------------------------
    {
        label: "Admin",
        active: "1"
    },
    {

        label: "Operator",
        active: "1"
    },
    {
        label: "Employee",
        active: "1"
    }
]);

console.log("Catalogs labels Added successfully.");
process.exit();