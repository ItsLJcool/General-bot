import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types/Command";

const ping: Command = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
    async execute(interaction) {
        const sent = await interaction.deferReply();
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        
        await interaction.editReply(`🏓 [Pong!](https://tenor.com/view/boom-cat-parry-brick-gif-27687560)\nRound-trip latency: ${latency}ms\nBot's Ping: ${client.ws.ping}ms`);
    },
};

export default ping;
