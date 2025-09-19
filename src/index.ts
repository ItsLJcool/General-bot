import { Client, GatewayIntentBits, Collection, Message, TextChannel, BaseChannel } from "discord.js";
import { reloadCommands } from "./commands/dev/reloadCommands";
import { Command } from "./types/Command";
import { initEvents } from "./deploy-commands";
import { Pages } from "./utils/Pages";
import "dotenv/config";


const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.commands = new Collection<string, Command>();
//region Global Definitions

globalThis.client = client;
globalThis.DEFAULT_CONTAINER_COLOR = 0x00FF00;

//endregion

reloadCommands();
initEvents();

client.login(process.env.TOKEN);