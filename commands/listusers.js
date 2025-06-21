const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listusers')
    .setDescription('Sunucudaki üyelerin katılım bilgilerini listele'),

  async execute(interaction) {
    await interaction.deferReply();

    // Sunucu üyelerini çek
    const members = await interaction.guild.members.fetch();

    // Üyeleri katılma tarihine göre sırala
    const sortedMembers = Array.from(members.values())
      .filter(member => member.joinedAt) // joinedAt varsa
      .sort((a, b) => a.joinedAt - b.joinedAt);

    const now = new Date();
    const fields = sortedMembers.map((member, index) => {
      const joinedAt = member.joinedAt;
      const diff = now - joinedAt;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;

      return {
        name: `#${index + 1} ${member.user.username}`, // 👈 Sıralı ID
        value: `Katıldı: ${joinedAt.toLocaleDateString('tr-TR')}\nGeçen: ${months} ay, ${remainingDays} gün`,
        inline: true,
      };
    });

    // Parça parça gönder (25 alan sınırlaması var.)
    const chunkSize = 25;

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

