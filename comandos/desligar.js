const Discord = require('discord.js');
require('dotenv').config();

const utils = require('../utils/utils');

const diegoId = process.env.DIEGOID;

exports.run = async (client, msg, args) => {
  if (args.length > 0 && args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle('.desligar')
      .setDescription('Desliga o bot.')
      .addField('**Aliases**', '``off``', true)
      .addField('**Argumentos**', '``Não possui argumentos.``', true)
      .addField('**Como usar**', '``desligar``')
      .addField('**Permissão**', '``Dono``', true)
      .setColor('#ff81f8')
      .setFooter('.help')
    );
  }
  
  if (msg.author.id === diegoId) {
    const path = require('path');

    const attachment = new Discord.MessageAttachment(path.join(__dirname, '../media/EstouDesligando.mp4'));
  
    await msg.channel.send(attachment);

    process.exit();
  } else {
    return msg.channel.send(utils.showError('not permission'));
  }
};

exports.help = {
  name: 'desligar',
  aliases: [
    'off'
  ],
  description: 'Desliga o bot.',
  args: [],
  usage: 'desligar',
  permission: 'Dono'
};