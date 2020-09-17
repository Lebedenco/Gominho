const Discord = require('discord.js');

const utils = require('../utils/utils');
const config = require('../config/config.json');

exports.run = (client, msg, args) => {
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`${ config.prefix }cancelar`)
      .setDescription('Cancela um dado usuário.')
      .addField('**Aliases**', '``cancel``', true)
      .addField('**Argumentos**', '``Usuário (user/string)``\n``Motivo (string)``', true)
      .addField('**Como usar**', `\`\`${ config.prefix }cancelar [usuário | nomeDoUsuário] [motivo]\`\``)
      .addField('**Permissão**', '``Todos``', true)
      .setColor(config.botColor)
      .setFooter(`${ config.prefix }help`)
    );
  }

  const arg = msg.content.split(' ');

  if (arg[1]) {
    let user = client.users.cache.get(utils.formatUserID(arg[1]));

    if (user) {
      arg[1] = user.username;
    }
  } else {
    return msg.channel.send(utils.showError('missing arguments'));
  }

  return msg.channel.send(`Manas, cancelem o ${ arg.splice(1).toString().replace(/,/g, ' ') }!`);
};

exports.help = {
  name: 'cancelar',
  aliases: [
    'cancel'
  ],
  description: 'Cancela um dado usuário.',
  args: [{
    name: 'Usuário',
    expects: 'user/string',
    alias: ''
  }, {
    name: 'Motivo',
    expects: 'string',
    alias: ''
  }],
  usage: 'cancelar [usuário | nomeDoUsuário] [motivo]',
  permission: 'Todos'
}