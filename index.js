const Discord = require('discord.js');
const botconfig = require("./botconfig.json");

const bot = new Discord.Client({disableEveryone: true});

var prefix = '!!!'

function disBot(channel) {
    message.delete()
    .then(msg => bot.destroy())
    .then(() => bot.destroy());
}

function resetBot(channel) {
    message.delete()
    .then(msg => bot.destroy())
    .then(() => bot.login(process.env.token));
}

bot.on('message', message => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return
    if(message.author === bot.user) return;
    if(message.content.startsWith(prefix + 'stopbot')) {
        disBot(message.channel);
    }
});

bot.on('message', message => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return
    if(message.author === bot.user) return;
    if(message.content.startsWith(prefix + 'reloadbot')) {
        resetBot(message.channel);
    }
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    if(cmd === `!!!clean`){
        
    }
    if(cmd === `!!!kick`){
  
      //!kick @daeshan askin for it
  
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send("Пользователь не найден!");
      let kReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав для использования данной команды!");
      if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Этого пользователя нельзя выгнать!");
  
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("~Kick~")
      .setColor("#e56b00")
      .addField("Выгнал пользователя", `${kUser} with ID ${kUser.id}`)
      .addField("Выгнал", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Время", message.createdAt)
      .addField("Причина", kReason);
  
      let kickChannel = message.guild.channels.find(`name`, "баны-кики");
      if(!kickChannel) return message.channel.send("Не удается найти канал для логирования!");
  
      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
  
      return;
    }
  
    if(cmd === `!!!ban`){
  
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Пользователь не найден!");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
      if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Этого пользователя нельзя заблокировать!");
  
      let banEmbed = new Discord.RichEmbed()
      .setDescription("~Ban~")
      .setColor("#bc0000")
      .addField("Заблокирован пользователь", `${bUser}`)
      .addField("Заблокировал", `<@${message.author.id}>`)
      .addField("Время", message.createdAt)
      .addField("Причина", bReason);
  
      let incidentchannel = message.guild.channels.find(`name`, "баны-кики");
      if(!incidentchannel) return message.channel.send("Не удается найти канал для логирования! Сообщите эту ошибку <@297577892156669954>");
  
      message.guild.member(bUser).ban(bReason);
      incidentchannel.send(banEmbed);
  
  
      return;
    }

    if(cmd === `!!!unban`){
  
        let bUser = message.guild.member(message.mentions.users.first());
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Недостаточно прав для использования данной команды!");
    
        let UnbanEmbed = new Discord.RichEmbed()
        .setDescription("~UnBan~")
        .setColor("#bc0000")
        .addField("Разблокирован пользователь", `${bUser}`)
        .addField("Разблокировал", `<@${message.author.id}>`)
        .addField("Время", message.createdAt)
    
        let incidentchannel = message.guild.channels.find(`name`, "баны-кики");
        if(!incidentchannel) return message.channel.send("Не удается найти канал для логирования! Сообщить эту ошибку <@297577892156669954>");
    
        message.guild.unban(bUser);
        incidentchannel.send(UnbanEmbed);
    
    
        return;
      }    
  
  
    if(cmd === `!!!report`){
  
      //!report @ned this is the reason
  
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("Couldn't find user.");
      let rreason = args.join(" ").slice(22);
  
      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#15f153")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", rreason);
  
      let reportschannel = message.guild.channels.find(`name`, "reports");
      if(!reportschannel) return message.channel.send("Не удалось найти канал для репортов! Сообщите эту ошибку <@297577892156669954>");
  
  
      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);
  
      return;
    }
  
  
  
  
    if(cmd === `!!!serverinfo`){
  
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("Информация о Discord сервере")
      .setColor("#15f153")
      .setThumbnail(sicon)
      .addField("Название Discord сервера", message.guild.name)
      .addField("Дата создания Discord сервера", message.guild.createdAt)
      .addField("Вы авторизировались в данном Discord сервер", message.member.joinedAt)
      .addField("Количество участников в данном Discord сервере", message.guild.memberCount);
  
      return message.channel.send(serverembed);
    }
  
  
  
    if(cmd === `!!!botinfo`){
  
      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("Информация о боту Discord сервера")
      .setColor("#15f153")
      .setThumbnail(bicon)
      .addField("Название бота", bot.user.username)
      .addField("Дата создания", bot.user.createdAt);
  
      return message.channel.send(botembed);
    }
  
  });

bot.login("NTE5NTE4OTExMjQzMjIzMDQz.DujOSw.5DgUwfr7ikniHjo8P7XLDcebxYc");

bot.on('ready', () => {
    console.log("Бот был успешно запущен!")
    bot.user.setPresence({ game: { name: '!!!help' }, status: 'online' })
});
