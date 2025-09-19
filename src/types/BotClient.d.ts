import { Collection, Message, BaseChannel, VoiceChannel, } from "discord.js";
import { Command } from "./Command";
import { Pages } from "../utils/Pages";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
    }
}