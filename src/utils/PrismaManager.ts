import { PrismaClient } from "@prisma/client";

export default class PrismaManager {
    static prisma: PrismaClient;

    static init() {
        this.prisma = new PrismaClient();
        console.log("✅ Prisma Client Initialized!");
    }

    // Here you add support for your custom Schema's as static methods!
}