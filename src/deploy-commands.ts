import { REST, Routes } from "discord.js";
import { loadCommands, loadEvents } from "./utils/load-commands";
import "dotenv/config";

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

export async function deployCommands() {
    try {
        const { global, dev } = loadCommands();
        console.log("🔄 Refreshing commands...");

        if (global.length > 0) {
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
                body: global.map(cmd => cmd.data.toJSON()),
            });
            console.log(`✅ Loaded ${global.length} global command(s).`);
        }

        if (dev.length > 0) {
            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID!,
                    process.env.DEV_GUILD_ID!
                ),
                { body: dev.map(cmd => cmd.data.toJSON()) }
            );
            console.log(`✅ Loaded ${dev.length} dev command(s).`);
        }

        console.log("🚀 Done!");
    } catch (err) {
        console.error("❌ Error deploying commands:", err);
    }
}

export async function initEvents() {
    try {
        console.log("🔄 Initalizing events...");
        const events = loadEvents();
        for (const event of events) {
            if (event.name == undefined) continue;
            if (event.once) client.once(event.name, event.execute);
            else client.on(event.name, event.execute);
        }
        console.log("✅ Initialized events.");
    } catch (err) {
        console.error("❌ Error initializing events:", err);
    }
}