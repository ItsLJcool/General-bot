import { SlashCommandBuilder, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { Command } from "../../types/Command";

const button: Command = {
    data: new SlashCommandBuilder()
    .setName("debug-buttons")
    .setDescription("Sends a page for debugging purposes"),
    async execute(interaction) {

        const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, confirm);

        await interaction.reply({
            content: "Hi",
            components: [row],
        });
    },

    async onButton(interaction) {
        if (!["confirm", "cancel"].includes(interaction.customId)) return;
        await interaction.reply("You clicked " + interaction.customId);
    }
};

export default button;