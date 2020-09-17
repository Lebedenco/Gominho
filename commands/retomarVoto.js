const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const config = require('../config/config.json');
const utils = require('../utils/utils');

exports.run = (client, msg, args) => {
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`${ config.prefix }retomarVoto`)
      .setDescription('Retoma uma votação pausada.')
      .addField('**Aliases**', '``Não possui aliases.``', true)
      .addField('**Argumentos**', '``ID da Mensagem (messageID)``', true)
      .addField('**Como usar**', `\`\`${ config.prefix }retomarVoto [idDaMensagem]\`\``)
      .addField('**Permissão**', '``Administrador``', true)
      .setColor(config.prefix)
      .setFooter(`${ config.prefix }help`)
    );
  }

  if (config.sugestoes.length >= 4) {
    let date = Date.now();

    date = new Date('Fri Sep 18 2020 07:34:16 GMT-0300');
    console.log(date);

    const id = args.find(arg => arg.name === 'string1').value.toString();

    if (!id || !msg.member.hasPermission('ADMNISTRATOR')) {
      return false;
    }

    client.guilds.cache.get(config.guild.find(g => g.id === msg.guild.id).id).channels.cache.get('754491811296444448').messages.fetch(id)
      .then(async message => {
        const filter = (reaction, user) => {
          return (reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣') && user.id !== process.env.DIEGOBOTID;
        }

        const time = date.getTime() - Date.now();
        console.log(time);

        const collector = message.createReactionCollector(filter, {
          time
        });

        collector.on('collect', (reaction, user) => {
          console.log(`Collected ${ reaction.emoji.name } from ${ user.tag }`);
        });

        message.reactions.cache.array().forEach(async reaction => {
          if (reaction._emoji.name === '1️⃣') {
            await collector.collected.set('1️⃣', {
              _emoji: {
                name: '1️⃣',
                count: reaction.count
              }
            });
          } else if (reaction._emoji.name === '2️⃣') {
            await collector.collected.set('2️⃣', {
              _emoji: {
                name: '2️⃣',
                count: reaction.count
              }
            });
          } else if (reaction._emoji.name === '3️⃣') {
            await collector.collected.set('3️⃣', {
              _emoji: {
                name: '3️⃣',
                count: reaction.count
              }
            });
          } else if (reaction._emoji.name === '4️⃣') {
            await collector.collected.set('4️⃣', {
              _emoji: {
                name: '4️⃣',
                count: reaction.count
              }
            });
          }
        })

        collector.on('end', collected => {
          console.log(`Collected ${ collected.size } items.`);
          message.channel.send(new Discord.MessageEmbed()
              .setTitle('Votação encerrada!')
              .addField('Resultado: ', collected.size > 0 ? collected.map(reaction => `\n${reaction._emoji.name}: ${reaction.count - 1}`) : 'Nada')
              .addField('Clique aqui para ver as opções:', `[Navegar!](${message.url})`)
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
  name: 'retomarVoto',
  aliases: [],
  description: 'Retoma uma votação pausada.',
  args: [{
    name: 'ID da Mensagem',
    expects: 'messageID',
    alias: ''
  }],
  usage: 'retomarVoto [idDaMensagem]',
  permission: 'Administrador'
}