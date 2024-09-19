const { EmbedBuilder, CommandInteraction, ApplicationCommand, PermissionsBitField } = require('discord.js')
module.exports = {
  name: "setchannel",
  description: "Returns websocket latency",
  type: 1,
  options: [
    {
      name: 'channel',
      description: 'The new channel',
      type: 7, // 3 is for a string option
      required: true
    }
  ],
  /**
   * 
   * @param {*} client 
   * @param {import('discord.js').Interaction} interaction
   */
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) 
      return interaction.followUp('You dont have permissions to manage the guild!');
    const channel = interaction.options.getChannel('channel');
    if (!channel) return interaction.followUp('Unexpected error with detecting/setting channel!');
    await client.db.set('channel', channel.id)
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Done!")
      .setDescription(`New channel set to: <#${channel.id}>`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};