const Discord = require('discord.js');
exports.run = async(client, message, args) => {
  var id = args[0]
  if(!id) return message.channel.send(
  new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(`${message.guild.name} Sunucusunun Resmi`)
    .setImage(message.guild.iconURL({dynamic: true, format: "png", size: 1024}))
    .setFooter(`${message.author.tag} istedi.`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
  )
  if(id.length > 18 || id.length < 18) return message.channel.send(
  new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle(":x: Başarısız!")
    .setDescription("Sunucu ID'leri 18 hanelidir.")
    .setFooter(`${message.author.tag} istedi.`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
  )
  var sunucu = client.guilds.cache.get(id)
  if(!sunucu) return message.channel.send(
  new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle(":x: Başarısız!")
    .setDescription(":no_entry_sign: Böyle bir sunucuda bulunmuyorum.")
    .setFooter(`${message.author.tag} istedi!`)
  )
  return message.channel.send(
  new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(`${sunucu.name} Sunucusunun Resmi`)
    .setImage(sunucu.iconURL({dynamic: true, format: "png", size: 1024}))
    .setFooter(`${message.author.tag} istedi.`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
  )
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "sunucupp",
  description: "",
  usage: "(prefix)sunucupp <id>"
};