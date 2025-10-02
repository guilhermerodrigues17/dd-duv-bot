import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const token = process.env.BOT_TOKEN;
const appId = process.env.APP_ID;
const guildId = process.env.PROD_GUILD_ID;

if (!token || !appId || !guildId) {
  throw new Error('Token or AppId not found in .env');
}

const commands = [
  new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Mostra informações sobre um membro do servidor.')
    .addUserOption(option =>
      option
        .setName('membro')
        .setDescription('O membro que você deseja consultar')
        .setRequired(true),
    ),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

export const registerCommands = async () => {
  try {
    console.log('Started refreshing commands.');

    await rest.put(Routes.applicationGuildCommands(appId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded commands.');
  } catch (error) {
    console.error(error);
  }
};
