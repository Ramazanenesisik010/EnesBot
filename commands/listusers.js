const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listusers')
    .setDescription('Sunucudaki üyelerin katılım bilgilerini listele'),

  async execute(interaction) {
    await interaction.deferReply();
    const members = await interaction.guild.members.fetch();
    const now = new Date();

    const fields = members.map(member => {
      if (!member.joinedAt) return null;

      const diff = now - member.joinedAt;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;

      return {
        name: member.user.username,
        value: `Katıldı: ${member.joinedAt.toLocaleDateString('tr-TR')}\nGeçen: ${months} ay, ${remainingDays} gün`,
        inline: true,
      };
    }).filter(Boolean);

    const chunkSize = 25;

    // Eğer çok üye varsa embed'leri parçalar halinde gönder
    for (let i = 0; i < fields.length; i += chunkSize) {
      const chunk = fields.slice(i, i + chunkSize);
      const embed = new EmbedBuilder()
        .setTitle('👥 Sunucu Üye Listesi')
        .setDescription(`Toplam üye: ${members.size}`)
        .addFields(chunk)
        .setColor('#5865F2')
        .setTimestamp();

      await interaction.followUp({ embeds: [embed] });
    }
  },
};
