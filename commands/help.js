import { MessageEmbed } from "discord.js";

export async function run(bot, message, args) {
  const Embed = new MessageEmbed()
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

export const cmds = {
  name: "help",
  aliases: []
}
