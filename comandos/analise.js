const Discord = require('discord.js');

const utils = require('../utils/utils');

exports.run = async (client, msg, args) => {
  // sendHelp
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle('.avatar')
      .setDescription('Ao fornecer um usuário ou uma imagem, retorna uma montagem fazendo ``Análise``.')
      .addField('**Aliases**', 'Não possui aliases.', true)
      .addField('**Argumentos**', '``Usuário (user)``\n``Imagem (link/image)``', true)
      .addField('**Como usar**', '``analise [usuário | imagem]``')
      .addField('**Permissão**', '``Todos``', true)
      .setColor('#ff81f8')
      .setFooter('.help')
    );
  }
  
  const canvas = require('../utils/canvas');
  const avatar = require('./avatar');
  const path = require('path');

  let img;

  img = args.find(arg => arg.name === 'string1') ? args.find(arg => arg.name === 'string1').value : undefined;

  if (!img) {
    for await (value of msg.attachments.values()) {
      value.url ? img = value.url : img = undefined;
    }

    if (!img) {
      img = args.find(arg => arg.name === 'link1') ? args.find(arg => arg.name === 'link1').value : undefined;

      if (!img) {
        img = avatar.run(client, msg, [], true)
      }
    }
  } else {
    img = avatar.run(client, msg, args, true);
  }

  const image = await canvas.analise(img, path.join(__dirname, '../media/analise.png'));

  const attachment = new Discord.MessageAttachment(image, 'analise.png');

  return msg.channel.send(new Discord.MessageEmbed()
    .setTitle('Análise')
    .attachFiles(attachment)
    .setImage('attachment://analise.png')
  );
};

exports.help = {
  name: 'analise',
  aliases: [
    'think',
    'thinking'
  ],
  description: 'Ao fornecer um usuário ou uma imagem, retorna uma montagem fazendo ``Análise``.',
  args: [{
    name: 'Usuário',
    expects: 'user',
    alias: ''
  }, {
    name: 'Imagem',
    expects: 'link/image',
    alias: ''
  }],
  usage: 'analise [usuário | imagem]',
  permission: 'Todos'
}