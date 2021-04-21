const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const qdb = require('quick.db');


const moment = require("moment");

const ayar = require("./settings.json");



const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", async() => {
    console.log(`${client.user.username} İsmi ile giriş yapıldı.`)
    client.user.setPresence({
        activity: { name: "MemoşŞ 💝 AURO" },
        status: "idle"
    });
    let botVoiceChannel = client.channels.cache.get(ayar.botVoiceChannel);
    if (botVoiceChannel)
        botVoiceChannel
        .join()
        .catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});

const log = message => {
    console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

fs.readdir("./Events", (err, files) => {
    if (err) return console.error(err);
    files.filter(file => file.endsWith(".js")).forEach(file => {
        let prop = require(`./Events/${file}`);
        if (!prop.configuration) return;
        client.on(prop.configuration.name, prop);
    });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./Commands/", (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./Commands/${f}`);
        log(`Yüklenen komut: ${props.conf.name}.`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.conf.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.conf.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./Commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.conf.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayar.sahip) permlvl = 4;
    return permlvl;
};

client.on("ready", () => {
  client.channels.cache.get("831167975712489472").join();
})

//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//
client.on("message", async(msg) => {

        if (msg.content === "ping") {
            msg.channel.send(`${client.ws.ping}`)
        } else return;
    })﻿
    /////----------------------------------------------------------------------------------------------/////

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'ℱℋ'
  const sunucu = '762576251625013258'
  const log = '801113017583796321'
  const rol = '788083546467729438'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});
/////----------------------------------------------------------------------------------------------/////
const kdb = new db.table("kullanıcı");
client.on("voiceStateUpdate", async(oldState, newState) => {
        if ((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)) { // Kanal değiştirmek ya da kanaldan çıkmak.
            let member = newState.member;
            let data = kdb.get(`durum.${member.id}.vmute`)
            if (!data) {
                member.voice.setMute(false)
            }
            if (data) {
                member.voice.setMute(true)
            }
        }
    })
//-------------------------------------------
client.on("guildMemberAdd", member => {
    var rol = qdb.fetch(`otorol_${member.guild.id}`) 
    var rolcük = member.guild.roles.cache.get(rol)
    var kanal = qdb.fetch(`otorolkanali_${member.guild.id}`)
    var kanalcık = member.guild.channels.cache.get(kanal)
    var yazı = qdb.fetch(`otorolyazi_${member.guild.id}`)
    if(!yazı){
      var yazı = "" 
    }
    const embedversion1mq = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(`${client.user.username} Otorol Sistemi`)
    .setDescription(`
    **${yazı}**
    
    **${member} kişisi ${member.guild} sunucusuna katıldı!**
    
    **Verilen rol: ${rolcük}**
    
    **Hoşgeldin ${member}! Seninle Birlikte ${member.guild.memberCount} kişi olduk!**
    `)
    kanalcık.send(embedversion1mq)
    member.roles.add(rolcük.id)
})
    /////----------------------------------------------------------------------------------------------/////
client.tarihHesapla = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);

    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;

    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;

    string = string.trim();
    return `\`${string} önce\``;
};
/////----------------------------------------------------------------------------------------------/////
client.on("message", (message) => {
            if (!message.guild || message.author.bot || message.content.toLowerCase().includes(`${ayar.prefix}afk`)) return;
            let embed = new MessageEmbed().setColor('DARK').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }));
            if (message.mentions.users.size >= 1) {
                let member = message.mentions.users.first();
                if (db.has(`${member.id}.afk`)) {
                    let data = db.get(`${member.id}.afk`);
                    let tarih = client.tarihHesapla(data.sure);
                    return message.channel.send(embed.setDescription(`${member} adlı üye ${data.sebep ? `**${data.sebep}** sebebiyle ` : ""}${tarih} AFK oldu.`)).then(x => x.delete({timeout: 10000}));;
      };
    };
    if(!db.has(`${message.author.id}.afk`)) return;
    if(message.member.manageable) message.member.setNickname(message.member.displayName.replace("[AFK]", "")).catch();
    db.delete(`${message.author.id}.afk`);
    message.channel.send(embed.setDescription(`${message.author} artık AFK değilsin!`)).then(x => x.delete({timeout: 5000}));
  });
  /////----------------------------------------------------------------------------------------------/////

    client.on("voiceStateUpdate",(oldMember, newMember) => {

        if(newMember.channelID != null) {
        db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
        }
        
        if(newMember.channelID == null) {
        db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
        }
        
         if (oldMember.channelID  != newMember.channelID  ) {
        db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
        db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
        }
        })
        /////----------------------------------------------------------------------------------------------/////
  
    
        setInterval(async() => {
            moment.locale('tr')
            var nowDate = moment().format("HH:mm:ss")
        if(nowDate === "00:00:00") {
             kdb.delete("banlimit") 
             }
        }, 500)

//stats

client.login(process.env.Token).then(a => {
  console.log(`✅ Tokene Bağlanıldı | Bot "${client.user.tag}" İsmi İle Giriş Yaptı. || Plasmic`)}).catch(a => {
  return log('⛔ Bot Başlatılamadı Hatalı Token ! || Plasmic')
})