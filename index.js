const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`✅ Bot ${client.user.tag} aktif!`);
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`❌ Komut dosyası "${file}" geçerli bir komut değil!`);
  }
}
const { REST, Routes } = require('discord.js');
const commands = client.commands.map(command => command.data.toJSON());
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log('✅ Komutlar yükleniyor...');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log('✅ Komutlar başarıyla yüklendi!');
  } catch (error) {
    console.error('❌ Komutlar yüklenirken hata oluştu:', error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'randomOpenVideo') {
      const json = (await fetch('https://sitwatch.net/api/videos/latest?page=1&limit=1')).json();
      const videoId = json[0].id;
      const randomVideoId = Math.floor(Math.random() * videoId + 1);

      const videoUrl = `https://sitwatch.net/watch/${randomVideoId}`;
      await interaction.reply({ content: `Rasgere açılan video: ${videoUrl}`, ephemeral: true });
    }
    return;
  }

  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('❌ Komut çalıştırılırken hata oluştu:', error);
    await interaction.reply({ content: '❌ Bir hata oluştu!', ephemeral: true });
  }
});

client.login(process.env.TOKEN);
