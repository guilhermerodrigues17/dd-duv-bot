import { Client, EmbedBuilder, Events, GuildMember } from 'discord.js';
import { registerCommands } from './register-commands';

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

client.login(process.env.BOT_TOKEN);

await registerCommands();

client.on('clientReady', c => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'userinfo') {
    try {
      const member = interaction.options.getMember('membro');
      if (!member || !(member instanceof GuildMember)) {
        await interaction.reply('Usuário não encontrado.');
        return;
      }

      const user = member.user;
      const joinedAt = member.joinedAt
        ? member.joinedAt.toLocaleDateString('pt-BR')
        : 'Data não disponível';
      const createdAt = user.createdAt.toLocaleDateString('pt-BR');
      const roles =
        member.roles.cache
          .filter(role => role.name !== '@everyone')
          .map(role => role.name)
          .join(', ') || 'Nenhum cargo';

      const embed = new EmbedBuilder()
        .setColor(member.displayHexColor)
        .setTitle(`Informações de ${user.username}`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          { name: 'Tag', value: `\`${user.tag}\``, inline: true },
          { name: 'ID', value: `\`${user.id}\``, inline: true },
          { name: 'Conta criada em', value: createdAt, inline: true },
          { name: 'Entrou no servidor em', value: joinedAt, inline: true },
          { name: 'Cargos', value: roles, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: `Solicitado por ${interaction.user.username}` });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Erro ao executar o comando userinfo:', error);
      await interaction.reply({
        content: 'Ocorreu um erro ao buscar as informações.',
        ephemeral: true,
      });
    }
  }
});
