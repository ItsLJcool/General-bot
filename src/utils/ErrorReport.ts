import { ContainerBuilder, BaseInteraction, CommandInteraction, MessageFlags, SeparatorSpacingSize } from "discord.js";
import { text } from "stream/consumers";

export class ErrorReport {
    error: string;
    message: string;
    __error: Error | undefined;
    constructor(message: string, error?: Error) {
        var stack = "No error stack provided";
        if (error?.stack) {
            stack = error.stack.replaceAll(process.cwd(), "");
            stack = stack.replaceAll("- ", "\- ");
            stack = stack.replaceAll("`", "\`");
        }

        this.error = stack;
        this.message = message;
        this.__error = error;
    }

    async emit(interaction:BaseInteraction) {
        const embed = new ContainerBuilder().addTextDisplayComponents(
            text => text.setContent("# An error occurred!"),
            text => text.setContent(this.message),
        ).addSeparatorComponents(seperator => seperator.setSpacing(SeparatorSpacingSize.Large))
        .addTextDisplayComponents(text => text.setContent("```" + this.error + "```"))
        .addSeparatorComponents(seperator => seperator.setSpacing(SeparatorSpacingSize.Large))
        .addTextDisplayComponents(text => text.setContent(`Please report this error to the bot's developers!`));

        const msg = {
            components: [embed],
            flags: (MessageFlags.Ephemeral | MessageFlags.IsComponentsV2),
        };

        if (this.__error) console.error(this.__error);

        if (interaction instanceof CommandInteraction) {
            if (interaction.deferred || interaction.replied) await interaction.followUp(msg);
            else await interaction.reply(msg);
        } else if (interaction instanceof BaseInteraction) {
            if (interaction.isRepliable()) await interaction.reply(msg);
            else console.error("Interaction was not repliable!");
        }
    }
}

export default ErrorReport;