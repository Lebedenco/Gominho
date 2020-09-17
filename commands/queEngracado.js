const Discord = require('discord.js');

const config = require('../config/config.json');

exports.run = (client, msg, args) => {
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`${ config.prefix }queEngracado`)
      .setDescription('Retorna uma resposta para momentos engraçados.')
      .addField('**Aliases**', '``qe``', true)
      .addField('**Argumentos**', 'Não possui argumentos.', true)
      .addField('**Como usar**', `\`\`${ config.prefix }queEngracado\`\``)
      .addField('**Permissão**', '``Todos``', true)
      .setColor(config.botColor)
      .setFooter(`${ config.prefix }help`)
    );
  }
  
  const path = require('path');

  const attachment = new Discord.MessageAttachment(path.join(__dirname, '../media/backdoor.mp4'));

  return msg.channel.send(attachment);
};

exports.help = {
  name: 'queEngracado',
  aliases: [
    'qe'
  ],
  description: 'Retorna uma resposta para momentos engraçados.',
  args: [],
  usage: 'queEngracado',
  permission: 'Todos'
}