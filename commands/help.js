const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const Embed = new discord.MessageEmbed()
  .setTitle('Commands')
  .setColor('BLUE')
  .addFields(
    { name: 'Command Here', value: 'Information of the Command' },
    { name: 'Command Here', value: 'Information of the Command'},
    // You can copy and paste these for more cmd fields
  )
  .setFooter(`Derpy's Bot Template`)
  .setTimestamp()
  
  message.channel.send(Embed);
}

module.exports.help = {
  name: "help",
  aliases: []
}