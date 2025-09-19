import { Event } from "../types/Event";
import { Events } from "discord.js";
import MarkedForDeletion from "../utils/MarkedForDeletion";

const clientReady: Event = {
    name: Events.ClientReady,
    async execute() {
        console.log(`${globalThis.client.user?.username} is ready!`);

        MarkedForDeletion.timeToClear = 5;
    },
};

export default clientReady;
