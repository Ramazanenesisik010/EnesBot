const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once('ready', () => {
  console.log(`Bot ${client.user.tag} aktif!`);
});
const { listUsersCommand } = require('./listusers.js');
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'listusers') {
    await listUsersCommand.execute(interaction);
  }
});
client.login(process.env.TOKEN);
