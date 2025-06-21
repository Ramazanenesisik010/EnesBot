const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rswatch')
        .setDescription('SitWatchdaki Videolardan Birini Rasgere Açar'),
    async execute(interaction) {
        const json = (await fetch('https://sitwatch.net/api/videos/latest?page=1&limit=1')).json();
        //const videoId = json[0].id;
        //const randomVideoId = Math.floor(Math.random() * videoId + 1);

        //const videoUrl = `https://sitwatch.net/watch/${randomVideoId}`;
        const embed = new EmbedBuilder()
            .setTitle('Rasgere Watch')
            .setDescription('Rasgere Watch, SitWatchdaki Videolardan Birini Rasgere Açar.')
            .addFields(
                { name: 'Value', value: JSON.stringify(json, null, 2) },
            )
            .setColor('#5865F2')
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};