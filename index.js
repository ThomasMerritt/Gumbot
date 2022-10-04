//Note: This will be unable to run without the proper node_modules

const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
var Scraper = require('images-scraper');

client.login(process.env.BOTTOKEN);
client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('on');
}

client.on('message', getMessage);

const PREFIX = '!';

const responses = [
    '*Blow Kiss*',
    'No',
    '*Yacks*',
    'Do I need to?',
    'Go away'
];


async function getMessage(msg) {
    let args = msg.content.substring(PREFIX.length).split(' ');
    const Guild = client.guilds.cache.get('983067222144602132');
    const Members = Guild.members.cache.map(member => member.user.username);    
    console.log(Members);

    switch (args[0]) {
        case 'love':
            msg.reply(responses[Math.floor(Math.random() * responses.length)]);
            break;
        case 'slap':
            if (Members.includes(args[1])) {
                    msg.reply(`slapped ${args[1]}`);
                    grabImage('anime slap gif');
            } else {
                msg.reply('Slap missed');
            }
            
        case 'bleach':
            if (!args[1]) {
                return msg.reply('Please define the amount to clear');
            } else {
                msg.channel.bulkDelete(args[1]);
            }
            break;
        case 'image':
            grabImage(args.join(' '));
            break;
        case 'url':
            let avatarUrl = msg.author.displayAvatarURL();
            msg.channel.send(avatarUrl);
        case'bible':
            msg.channel.send('https://docs.google.com/spreadsheets/d/1qiy_Oi8aFiPmL4QSTR3zHe74kmvc6e_159L1mAUUlU0/edit#gid=0');
    }

    function grabImage(image_query) {
        const google = new Scraper({
            puppeteer: {
              headless: true,
            },
          })
    
          console.log('yes');
    
          (async () => {
                console.log(image_query.length);
                const results = await google.scrape(image_query, 100);
                msg.channel.send(results[Math.floor(Math.random() * results.length)].url);
          })();
    }
}