const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listusers')
    .setDescription('Sunucudaki üyeleri ve katıldıkları tarihi listele'),

  async execute(interaction) {
    await interaction.deferReply();

    const members = await interaction.guild.members.fetch();
    const lines = [];

    const now = new Date();

    for (const member of members.values()) {
      const joinedAt = member.joinedAt;

      if (!joinedAt) continue;

      const diff = now - joinedAt;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;

      const joinedDate = joinedAt.toLocaleDateString('tr-TR');
      lines.push(
        `${member.user.username.padEnd(15)} | ${joinedDate} | ${months} ay, ${remainingDays} gün`
      );
    }

    // Eğer liste çok uzunsa parçalar halinde gönder
    const chunkSize = 10;
    for (let i = 0; i < lines.length; i += chunkSize) {
      const chunk = lines.slice(i, i + chunkSize);
      await interaction.followUp(
        'Kullanıcı           | Katılma Tarihi | Geçen Süre\n' +
        '-------------------|----------------|-----------------\n' +
        chunk.join('\n')
      );
    }
  },
};
