import { SlashCommandBuilder, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel, ContainerComponent, SeparatorSpacingSize, ActionRow } from "discord.js";
import { Command } from "../../types/Command";

import { Pages, PageInformation, PageData, CachedPage } from "../../utils/Pages";
import MarkedForDeletion from "../../utils/MarkedForDeletion";

const page: Command = {
    data: new SlashCommandBuilder()
    .setName("debug-page")
    .setDescription("Sends a page for debugging purposes"),
    async execute(interaction) {
        await interaction.deferReply();

        const cachedPage = Pages.CACHED_PAGES.get(interaction.user.id);
        if (cachedPage != undefined) {
            const channel = (interaction.channel as TextChannel);
            const fetched = await channel.messages.fetch(cachedPage.message_id);
            const containers = fetched.components.filter(c => c instanceof ContainerComponent);
            await fetched.edit({ components: containers });

            MarkedForDeletion.markMessage(channel.id, cachedPage.message_id);
        }

        const page = generatePageData();
        const built = page.build();
        if (built == undefined) return await interaction.editReply("No pages available!");

        const message = await (await interaction.editReply({
            components: [built, generatePageInputs(interaction, page)],
            flags: (MessageFlags.IsComponentsV2),
        })).fetch();

        Pages.CACHED_PAGES.set(interaction.user.id, ({ page, message_id: message.id } as CachedPage));
    },

    async onButton(interaction) {
        await interaction.deferReply({flags: (MessageFlags.Ephemeral)});
        if (!interaction.customId.startsWith(interaction.user.id)) return (await interaction.editReply({ content: "Can't edit a page you didn't create!"}));

        const cachedPage = Pages.CACHED_PAGES.get(interaction.user.id);
        const currentPage = cachedPage?.page;
        if (currentPage == undefined) return await interaction.editReply({ content: "Failed to load this page!\n Maybe the **page** no loger exists in cache?"});

        const isNext = (interaction.customId.split("-").pop() == "next");
        if (isNext) currentPage.next();
        else currentPage.prev();

        const build = currentPage.build();
        if (build == undefined) return await interaction.editReply({ content: `Failed to load the ${(isNext ? "Next" : "Previous")} page!\nFailed to possibly build the page!"`});

        const pageMessage = cachedPage?.message_id;
        if (pageMessage == undefined) return await interaction.editReply({ content: "Failed to load this page!\n Maybe the **message** no loger exists in cache or was deleted?"});

        const fetched = await (interaction.channel as TextChannel).messages.fetch(pageMessage);        
        fetched.edit({ components: [build, generatePageInputs(interaction, currentPage)] });
        await interaction.deleteReply();
    }
};

function generatePageData():Pages {
    const page = new Pages();

    const test = new PageInformation();
    test.title = "# Test";
    test.description = "This is a description for your page!";
    test.add(["This is a Text Element!", "And So is this one!"], SeparatorSpacingSize.Large);
    test.add(["This is a new line!!"]);

    page.add(test);
    
    const test2 = new PageInformation();
    test2.title = "Test (2nd page)";
    test2.description = "Also a description for your page!";
    test2.add(["whoa! A whole new page!?"]);

    page.add(test2);

    return page;
}

function generatePageInputs(interaction:any, page:Pages):ActionRowBuilder<ButtonBuilder> {
    const back = new ButtonBuilder().setCustomId(`${interaction.user.id}-back`).setLabel("(←) Back").setStyle(ButtonStyle.Primary);
    const pageNumber = new ButtonBuilder().setCustomId(`cant-click`).setLabel(`Page ${(page.currentPage)+1}/${(page.maxPages)}`).setStyle(ButtonStyle.Secondary).setDisabled(true);
    const next = new ButtonBuilder().setCustomId(`${interaction.user.id}-next`).setLabel("Next (→)").setStyle(ButtonStyle.Primary);

    if (page.currentPage == 0) back.setDisabled(true);
    if (page.currentPage >= (page.maxPages-1)) next.setDisabled(true);

    return (new ActionRowBuilder<ButtonBuilder>().addComponents(back, pageNumber, next));
}

export default page;
