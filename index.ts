import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { baseCollection } from './src/commands/collections/base';
import fs from 'fs';
import path from 'path';

const discordToken = Bun.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
if (!client) {
  throw new Error('Client not initialized');
}

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(discordToken);
if (!client.isReady()) {
  throw new Error('Client not ready');
}
