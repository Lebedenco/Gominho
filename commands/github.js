const Discord = require('discord.js');

const config = require('../config/config.json');

exports.run = (client, msg, args) => {
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`${ config.prefix }github`)
      .setDescription('Retorna o código-fonte do Gominho.')
      .addField('**Aliases**', '``gh``\n``codigo``\n``código``\n``code``', true)
      .addField('**Argumentos**', 'Não possui argumentos.', true)
      .addField('**Como usar**', `\`\`${ config.prefix }github\`\``)
      .addField('**Permissão**', '``Todos``', true)
      .setColor(config.botColor)
      .setFooter(`${ config.prefix }help`)
    );
  }

  return msg.channel.send('Aqui está meu código-fonte:\nhttps://github.com/Lebedenco/Gominho');
};

exports.help = {
  name: 'github',
  aliases: [
    'gh',
    'codigo',
    'código',
    'code'
  ],
  description: 'Retorna o código fonte do Gominho.',
  args: [],
  usage: '.github',
  permission: 'Todos'
}