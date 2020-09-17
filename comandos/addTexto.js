const Discord = require('discord.js');

const utils = require('../utils/utils');
const canvas = require('../utils/canvas');

exports.run = async (client, msg, args) => {
  // sendHelp
  if (args.length > 0 && args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle('.addTexto')
      .setDescription('Adiciona um texto à uma dada imagem.')
      .addField('**Aliases**', '``at``\n``addText``\n``addT``', true)
      .addField('**Argumentos**', '``Imagem (link/image)``\n``Texto (string)``\n``color | c (string)``\n``size | s (number)``\n``font | f (string)``', true)
      .addField('**Como usar**', '``addTexto [imagem] [texto] [-color cor] [-size tamanho] [-font fonte]``')
      .addField('**Permissão**', '``Todos``', true)
      .setColor('#ff81f8')
      .setFooter('.help')
    );
  }

  let image;

  if (msg.attachments.array().length > 0) {
    for await (value of msg.attachments.values()) {
      value.url ? image = value.url : undefined;
    }
  }

  if (!image) {
    image = args.find(arg => arg.name === 'link1') ? args.find(arg => arg.name === 'link1').value : undefined;
  }

  if (args.find(arg => arg.name === 'string1') && image) {
    const text = args.find(arg => arg.name === 'string1').value;
    const color = args.find(arg => arg.name === 'color' || arg.name === 'c') ? args.find(arg => arg.name === 'color' || arg.name === 'c').value : undefined;
    const font = args.find(arg => arg.name === 'font' || arg.name === 'f') ? args.find(arg => arg.name === 'font' || arg.name === 'f').value : undefined;
    const fontSize = args.find(arg => arg.name === 'size' || arg.name === 's') ? args.find(arg => arg.name === 'size' || arg.name === 's').value : undefined;

    image = await canvas.addText(image, text, color, font, fontSize);
  } else {
    return msg.channel.send(utils.showError(400));
  }

  const attachment = new Discord.MessageAttachment(image, 'img.png');

  msg.delete();

  return msg.channel.send(new Discord.MessageEmbed()
    .attachFiles(attachment)
    .setImage('attachment://img.png')
    .setAuthor(`Imagem por: ${msg.member.nickname ? msg.member.nickname : msg.member.user.username}`)
    .setColor('#ff81f8')
  );
};

exports.help = {
  name: 'addTexto',
  aliases: [
    'addText',
    'addT',
    'at'
  ],
  description: 'Adiciona um texto à uma dada imagem.',
  args: [{
    name: 'Imagem',
    expects: 'link/image',
    alias: ''
  }, {
    name: 'Texto',
    expects: 'string',
    alias: ''
  }, {
    name: 'color',
    expects: 'string',
    alias: 'c'
  }, {
    name: 'size',
    expects: 'number',
    alias: 's'
  }, {
    name: 'font',
    expects: 'string',
    alias: 'f'
  }],
  usage: 'addTexto [imagem] [texto] [-color cor] [-size tamanho] [-font fonte]',
  permission: 'Todos'
}