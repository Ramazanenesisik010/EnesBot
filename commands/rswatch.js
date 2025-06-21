const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rswatch')
        .setDescription('SitWatchdaki Videolardan Birini Rasgere Açar'),
    async execute(interaction) {
        const json = (await fetch('https://sitwatch.net/api/videos/latest?page=1&limit=1')).json();
        console.debug('SitWatch API Response:', json);
        const videoId = json[0].id;
        //const randomVideoId = Math.floor(Math.random() * videoId + 1);

        //const videoUrl = `https://sitwatch.net/watch/${randomVideoId}`;
        const embed = new EmbedBuilder()
            .setTitle('Rasgere Watch')
            .setDescription('Rasgere Watch, SitWatchdaki Videolardan Birini Rasgere Açar.')
            .addFields(
                { name: 'Nasıl Kullanılır?', value: 'Bu komutu kullanarak SitWatchdaki videolardan birini rasgere açabilirsiniz.' },
                { name: 'Örnek Kullanım', value: '/rswatch' }
            )
            .setColor('#5865F2')
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};