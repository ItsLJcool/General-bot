import { Events } from "discord.js";

export interface Event {
    name: Events | string;
    execute: (...args: any[]) => Promise<void>;
    once?: boolean;
}