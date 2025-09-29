import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Retorna informações sobre o servidor.');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply(
    `Esse comando foi executado no servidor ${interaction.guild?.name}, que contem ${interaction.guild?.memberCount} membros.`,
  );
}
