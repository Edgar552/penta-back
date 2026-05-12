import { PrismaClient } from "@prisma/client";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPlanetScale({
    url: connectionString
});

const prisma = new PrismaClient({
    adapter
});

export default prisma;