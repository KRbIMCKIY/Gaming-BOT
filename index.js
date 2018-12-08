const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');

const client = new Discord.Client();

var prefix = '-+'

function disBot(channel) {
    const disconnectbot = new RichEmbed()
    .setTitle('Выключение Discord Bot')
    .setColor('0xFF0000')
    .setDescription('Бот успешно завершил свою работу\nDiscord Developer Bot by Desert_Gamer!')
    const disconnectsbot = new RichEmbed()
    .setTitle('Информация Discord Bot')
    .setColor('0x008000')
    .setDescription('Бот успешно завершил свою работу\nDiscord Developer Bot by Desert_Gamer!')
    client.guilds.find(g => g.id == "495177551098937345").channels.find(c => c.name == "connect-disconnect").send(disconnectsbot)
    .then(message => client.destroy())
    .then(() => client.destroy());
}

function resetBot(channel) {
    const restartbot = new RichEmbed()
    .setTitle('Перезапуск Discord Bot')
    .setColor('0xFF0000')
    .setDescription('Бот успешно перезагрузился\nDiscord Developer Bot by Desert_Gamer!')
    const restartbots = new RichEmbed()
    .setTitle('Информация Discord Bot')
    .setColor('0x008000')
    .setDescription('Бот успешно перезагрузился\nDiscord Developer Bot by Desert_Gamer!')
    client.guilds.find(g => g.id == "495177551098937345").channels.find(c => c.name == "connect-disconnect").send(restartbots)
    .then(msg => client.destroy())
    .then(() => client.login(process.env.token));
}

client.on('message', message => {
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'help')) {
        message.channel.send('```Markdown\n#Приветствуем тебя ниже ты можешь посмотреть краткую информацию о боте.``````diff\n+ Краткая информация.\n- Создатель данного Discord сервера являеться - Desert_Gamer\n- Разработчик данного бота - Desert_Gamer\n- Для того чтобы узнать как получить другие роли, перейдите в канал #гайд.\n- Версия бота Discord - 1.1.3```').then (msg => msg.react('✅'));
     }
 });

 client.on('message', message => {
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'menu')) {
        message.channel.send('```Markdown\n#В данный момент ты находишься в главном меню нашего Discord сервера.``````diff\n+ Краткая информация.\n- ✅ - перейти в раздел об информации о ролях Discord сервера\n- 🔥 - перейти в раздел об правила Discord сервера\n- 🌟 - перейти в раздел информации о командах бота .\n- Версия бота Discord - 1.1.3\n- Создатель Discord бота - Desert_Gamer```').then (msg => {
        msg.react('\🌟');
        msg.react('\✅');
        msg.react('\🔥');
        })
    }
 });

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
  channel.send('```Markdown\n#Приветствую тебя! Ты находишься на оффициальном дискорд сервере канала bigvossen 13.```\n```diff\n+ Краткая информация о том как получить роль в нашем дискорд сервере.\n- Информацию о том как получить роль на нашем Discord сервере находиться - #гайд\n- Информацию о новых видео роликах, а также стримах Вы можете получить - #youtube-info.\n- Для того чтобы войти в меню нашего дискорд сервера - -+menu```');
});

client.on('message', message => {
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'ping')) {
        message.channel.send(`Авторизован как ${client.user.tag}, UPTIME: ${client.uptime} by <@297577892156669954>`).then(msg => msg.delete(5000));
        message.delete();
    }
 });

client.on('message', message => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'stopbot')) {
        disBot(message.channel);
    }
});

client.on('message', message => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'reloadbot')) {
        resetBot(message.channel);
    }
});

client.login(process.env.token);

client.on('ready', () => {
    console.log("Бот был успешно запущен!");
    const loginbot = new RichEmbed()
    .setTitle('Активация Discord Bot')
    .setColor('0xFF0000')
    .setDescription('Бот успешно запущен\nDiscord Developer Bot by Desert_Gamer!')
    const loginsbot = new RichEmbed()
    .setTitle('Информация Discord Bot')
    .setColor('0x008000')
    .setDescription('Бот запустился\nDiscord Developer Bot by Desert_Gamer!')
    client.guilds.find(g => g.id == "495177551098937345").channels.find(c => c.name == "connect-disconnect").send(loginsbot);
    client.user.setPresence({ game: { name: 'by Desert_Gamer' }, status: 'online' })
});