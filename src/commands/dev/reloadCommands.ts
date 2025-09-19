import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types/Command";

import { loadCommands } from "../../utils/load-commands";
import { deployCommands } from "../../deploy-commands";

const reload: Command = {
    data: new SlashCommandBuilder()
    .setName("reload-commands")
    .setDescription("Reloads the bot's commands"),
    async execute(interaction) {
        await interaction.reply("Reloading...");
        reloadCommands();
        await interaction.editReply("Reloaded!");
    },
}

export function reloadCommands() {
    client.commands.clear();
    const { global, dev } = loadCommands();
    [...global, ...dev].forEach(cmd => { client.commands.set(cmd.data.name, cmd); });

    deployCommands();
}

export default reload;