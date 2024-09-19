const { EmbedBuilder } = require('discord.js')
const config = require('../config.json');
const fs = require('fs');
module.exports = {
  name: "toggle",
  description: "Toggle the autodelete",
  type: 1,

  run: async (client, interaction) => {
    currentSetting = await client.db.get('toggle');
    client.db.set('toggle', currentSetting ? false : true)
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Done!")
      .setDescription(`Toggled the data to \`${currentSetting ? false : true}\``)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};