import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  ChatInputCommandInteraction,
  ButtonInteraction,
} from "discord.js";

export type SlashCommand =
  | SlashCommandBuilder
  | SlashCommandOptionsOnlyBuilder
  | SlashCommandSubcommandsOnlyBuilder;

export interface Command {
  data: SlashCommand;
  execute: (interaction: ChatInputCommandInteraction) => Promise<any>;
  
  onButton?: (interaction: ButtonInteraction) => Promise<any>;
  onAnySelectMenu?: (interaction: ButtonInteraction) => Promise<any>;
}
