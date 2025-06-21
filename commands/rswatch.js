const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rswatch')
        .setDescription('SitWatchdaki Videolardan Birini Rasgere Açar'),
    async execute(interaction) {
        // Buton oluşturma
        const button = new ButtonBuilder()
            .setCustomId('randomOpenVideo')
            .setLabel('Rasgere Aç')
            .setStyle(ButtonStyle.Primary);
        const row = new ActionRowBuilder().addComponents(button);

        const embed = new EmbedBuilder()
            .setTitle('Rasgere Watch')
            .setDescription('Rasgere Watch, SitWatchdaki Videolardan Birini Rasgere Açar.')
            .addFields(
                { name: 'Nasıl Kullanılır?', value: 'Bu komutu kullanarak SitWatchdaki videolardan birini rasgere açabilirsiniz.' },
                { name: 'Örnek Kullanım', value: '/rswatch' }
            )
            .setColor('#5865F2')
            .setTimestamp()

        await interaction.reply({ embeds: [embed] , components: [row] });
    }
};