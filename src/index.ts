import { Client, IntentsBitField } from 'discord.js';

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

client.on('clientReady', c => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(process.env.BOT_TOKEN);
