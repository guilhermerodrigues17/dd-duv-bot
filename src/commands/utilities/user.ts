import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Retorna informações sobre o usuário.');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply(
    `Esse comando foi executado por ${interaction.user.tag}, que tem os seguinte cargos: ${interaction.member?.roles}.`,
  );
}
