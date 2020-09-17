const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const config = require('../config/config.json');
const utils = require('../utils/utils');

exports.run = (client, msg, args) => {
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`${ config.prefix }sugerir`)
      .setDescription('Adiciona uma sugestão para o que assistiremos em live. Ao chegar em 4 sugestões, será iniciada uma enquete.')
      .addField('**Argumentos**', '``Sugestão (string)``', true)
      .addField('**Como usar**', `${ config.prefix }sugerir [sugestão]\`\``)
      .addField('**Permissão**', '``Moderador``', true)
      .setColor(config.botColor)
      .setFooter(`${ config.prefix }help`)
    );
  }

  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    return msg.channel.send(utils.showError('!permission'));
  }

  if (config.sugestoes.length >= 4) {
    return msg.channel.send(utils.showError('A lista de sugestões está cheia!'));
  }

  const arg = args.find(a => a.name === 'string1');

  if (!arg) {
    return msg.channel.send(utils.showError(400));
  }

  config.sugestoes.push(arg.value);

  msg.channel.send(`Sua sugestão \`\`${ arg.value }\`\` foi adicionada com sucesso!`);

  if (config.sugestoes.length >= 4) {
    let date = Date.now();

    date += parseInt(utils.nextWeekdayDate(date, 5).getTime() - Date.now());
    date = new Date(date);

    msg.channel.send(new Discord.MessageEmbed()
        .setTitle(`${ args.find(arg => arg.name === 'title') ? args.find(arg => arg.name === 'title').value : 'Votação.' } Você tem até ${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() } ${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() } para votar!`)
        .addFields({
          name: '\:one:',
          value: config.sugestoes[0],
          inline: true
        }, {
          name: '\:two:',
          value: config.sugestoes[1],
          inline: true
        }, {
          name: '\u200B',
          value: '\u200B',
          inline: false
        }, {
          name: '\:three:',
          value: config.sugestoes[2],
          inline: true
        }, {
          name: '\:four:',
          value: config.sugestoes[3],
          inline: true
        })
        .setTimestamp()
        .setColor(config.botColor)
        .setFooter('Reaja com um dos emojis abaixo para votar!'))
      .then(async message => {
        message.react('1️⃣');
        message.react('2️⃣');
        message.react('3️⃣');
        message.react('4️⃣');

        const filter = (reaction, user) => {
          return (reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣') && user.id !== config.botID;
        }

        const collector = message.createReactionCollector(filter, {
          time: date.getTime() - Date.now()
        });

        collector.on('collect', (reaction, user) => {
          console.log(`Collected ${ reaction.emoji.name } from ${ user.tag }`);
        });

        collector.on('end', collected => {
          console.log(`Collected ${ collected.size } items.`);
          message.channel.send(new Discord.MessageEmbed()
              .setTitle('Votação encerrada!')
              .addField('Resultado: ', collected.size > 0 ? collected.map(reaction => `\n${ reaction._emoji.name }: ${ reaction.count - 1 }`) : 'Nada')
              .addField('Clique aqui para ver as opções:', `[Navegar!](${ message.url })`)
              .setColor(config.botColor))
            .then(() => {
              fs.writeFileSync(path.join(__dirname, '..', 'config', 'config.json'), JSON.stringify(config), err => {
                if (err) {
                  return msg.channel.send(utils.showError(err));
                }
              });
            })
        });
      });
  }
};

exports.help = {
  name: 'sugerir',
  aliases: [],
  description: 'Adiciona uma sugestão para o que assistiremos em live. Ao chegar em 4 sugestões, será iniciada uma enquete.',
  args: [{
    name: 'Sugestão',
    expects: 'string',
    alias: ''
  }],
  usage: 'sugerir [sugestão]',
  permission: 'Moderador'
}