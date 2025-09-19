import { Event } from "../types/Event";
import { ButtonInteraction, Events, MessageFlags } from "discord.js";

import ErrorReport from "../utils/ErrorReport";

const interactionCreate: Event = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isCommand()) return await registerCommand(interaction);

        if (interaction.isButton()) return await registerButton(interaction);

        console.log(interaction);
    },
};

async function registerCommand(interaction:any) {
    const command = client.commands.get(interaction.commandName);
    if (!command)  {
        console.log(`Unknown command: ${interaction.commandName}`);
        interaction.reply({ content: "Unknown command!", flags: (MessageFlags.Ephemeral) });
        return;
    }

    try {
        await command.execute(interaction);
    } catch (err:any) {
        await new ErrorReport(`Failed to execute the ${interaction.commandName} command!`, err).emit(interaction);
    }
}

async function registerButton(interaction:any) {
    client.commands.forEach(async cmd => {
        try {
            if (cmd.onButton) await cmd.onButton(interaction);
        } catch (err:any) {
            new ErrorReport(`Failed to execute button interaction for \`${cmd.data.name}\`!`, err).emit(interaction);
        }
    });
}

export default interactionCreate;