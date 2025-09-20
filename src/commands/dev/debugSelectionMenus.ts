import { SlashCommandBuilder, MessageFlags, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, UserSelectMenuBuilder} from "discord.js";
import { Command } from "../../types/Command";

const debugSelectionMenus: Command = {
    data: new SlashCommandBuilder()
    .setName("debug-selection-menus")
    .setDescription("Debugs the Selection Menus!"),
    async execute(interaction) {
        // const select = new StringSelectMenuBuilder()
        // .setCustomId(`${interaction.user.id}-starter`)
        // .setPlaceholder('Make a selection!')
        // .addOptions(
        //     new StringSelectMenuOptionBuilder()
        //         .setLabel('Bulbasaur')
        //         .setDescription('The dual-type Grass/Poison Seed Pokémon.')
        //         .setValue('bulbasaur'),
        //     new StringSelectMenuOptionBuilder()
        //         .setLabel('Charmander')
        //         .setDescription('The Fire-type Lizard Pokémon.')
        //         .setValue('charmander'),
        //     new StringSelectMenuOptionBuilder()
        //         .setLabel('Squirtle')
        //         .setDescription('The Water-type Tiny Turtle Pokémon.')
        //         .setValue('squirtle'),
        // ).setMaxValues(3);
        
        const userSelect = new UserSelectMenuBuilder()
        .setCustomId(`${interaction.user.id}-debug-user-select`)
        .setPlaceholder('Select multiple users.')
        .setMinValues(1)
        .setMaxValues(10);
        
        const row = new ActionRowBuilder<UserSelectMenuBuilder>().setComponents(userSelect);
        
        await interaction.reply({ content: "Haha select a person lmao", components: [row] });
    },
    
    async onAnySelectMenu(interaction:any) {
        if (interaction.customId != `${interaction.user.id}-debug-user-select`) return;
        interaction.reply({ content: `You selected <@${interaction.values.join(">, <@")}>!`, flags: (MessageFlags.Ephemeral) });
    },
};

export default debugSelectionMenus;