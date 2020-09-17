const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const utils = require('../utils/utils');
const config = require('../config/config.json');

exports.run = async (client, msg, args) => {
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`${ config.prefix }quote`)
      .setDescription('Retorna ou adiciona uma citação.')
      .addField('**Aliases**', '``citacao``\n``citação``\n``q``', true)
      .addField('**Argumentos**', '``Número (number)``\n``-add | -a (messageID)``', true)
      .addField('**Como usar**', `\`\`${ config.prefix }quote [númeroDaQuote] [-add idDaMensagem]\`\``)
      .addField('**Permissão**', '``Todos``', true)
      .setColor(config.botColor)
      .setFooter(`${ config.prefix }help`)
    );
  }

  const messageID = args.find(arg => arg.name === 'string1') ? args.find(arg => arg.name === 'string1').value : undefined;

  if (args.find(arg => (arg.name === 'add' || arg.name === 'a') && arg.value)) {
    let message;

    for await (value of msg.guild.channels.cache.values()) {
      if (value instanceof Discord.VoiceChannel || value instanceof Discord.CategoryChannel) {
        continue;
      }

      await value.messages.fetch(messageID)
        .then(msg => {
          message = msg;
        })
        .catch(err => console.log(err));

      if (message) {
        break;
      }
    }

    if (!message) {
      return msg.channel.send(utils.showError(404));
    }

    const existingQuote = config.quotes.find(quote => quote.id === messageID);

    if (existingQuote) {
      return msg.channel.send(`Essa citação já foi adicionada!\n\`\`${existingQuote.author}\`\`: ${existingQuote.quote}`);
    }

    config.quotes.push({
      id: message.id,
      quote: message.content,
      author: message.author.username,
      createdBy: msg.author.username
    });

    fs.writeFileSync(path.join(__dirname, '../config/config.json'), JSON.stringify(config), (err) => {
      if (err) {
        return utils.showError(err);
      }
    });

    return msg.channel.send(`Citação adicionada com sucesso! ` +
      `Use \`\`${ config.prefix }quote ${ config.quotes.length }\`\` para ver a citação.`);
  }

  const number = args.find(arg => arg.name === 'string1') ? args.find(arg => arg.name === 'string1').value : undefined;

  const quote = config.quotes[parseInt(number)];
  
  if (quote) {
    return msg.channel.send(`\`\`${quote.author}\`\`: \`\`${quote.quote}\`\``);
  }

  if (!messageID && !number) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle('Citações')
      .addField('Citações', config.guild.find(g => g.id === guildID) ? config.guild.find(g => g.id === guildID).quotes.map(quote => `\`\`${quote.quote}\`\`\nAutor: \`\`${quote.author}\`\`\nCriada por: \`\`${quote.createdBy}\`\`\n\n`) : 'Este servidor não possui citações.')
    );
  }

  return msg.channel.send(utils.showError(404));
};

exports.help = {
  name: 'quote',
  aliases: [
    'citacao',
    'citação',
    'q'
  ],
  description: 'Retorna ou adiciona uma citação.',
  args: [{
    name: 'Número',
    expects: 'number',
    alias: ''
  }, {
    name: '-add',
    expects: 'messageID',
    alias: '-a'
  }],
  usage: 'quote [númeroDaQuote] [-add idDaMensagem]',
  permission: 'Todos'
}