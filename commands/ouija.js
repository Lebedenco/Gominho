const Discord = require('discord.js');

const utils = require('../utils/utils');
const config = require('../config/config.json');

exports.run = (client, msg, args) => {
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`${ config.prefix }ouija`)
      .setDescription('Retorna uma resposta estilo Ouija para uma pergunta.')
      .addField('**Aliases**', '``Não possui aliases``', true)
      .addField('**Argumentos**', '``Pergunta (string)``', true)
      .addField('**Como usar**', `\`\`${ config.prefix }ouija [pergunta]\`\``)
      .addField('**Permissão**', '``Todos``', true)
      .setColor(config.botColor)
      .setFooter(`${ config.prefix }help`)
    );
  }

  const pergunta = args.find(arg => arg.name === 'string1');
  let resposta = '',
    flag = true;

  if (pergunta) {
    for (let i = 0 ; flag ; i++) {
      let letra = utils.getRandomInt(1, 300);

      if (letra > 0 && letra <= 10) {
        resposta += 'a';

        continue;
      } else if (letra > 10 && letra <= 20) {
        resposta += 'b';

        continue;
      } else if (letra > 20 && letra <= 30) {
        resposta += 'c';

        continue;
      } else if (letra > 30 && letra <= 40) {
        resposta += 'd';

        continue;
      } else if (letra > 40 && letra <= 50) {
        resposta += 'e';

        continue;
      } else if (letra > 50 && letra <= 60) {
        resposta += 'f';

        continue;
      } else if (letra > 60 && letra <= 70) {
        resposta += 'g';

        continue;
      } else if (letra > 70 && letra <= 80) {
        resposta += 'h';

        continue;
      } else if (letra > 80 && letra <= 90) {
        resposta += 'i';

        continue;
      } else if (letra > 90 && letra <= 100) {
        resposta += 'j';

        continue;
      } else if (letra > 100 && letra <= 110) {
        resposta += 'k';

        continue;
      } else if (letra > 110 && letra <= 120) {
        resposta += 'l';

        continue;
      } else if (letra > 120 && letra <= 130) {
        resposta += 'm';

        continue;
      } else if (letra > 130 && letra <= 140) {
        resposta += 'n';

        continue;
      } else if (letra > 140 && letra <= 150) {
        resposta += 'o';

        continue;
      } else if (letra > 150 && letra <= 160) {
        resposta += 'p';

        continue;
      } else if (letra > 160 && letra <= 170) {
        resposta += 'q';

        continue;
      } else if (letra > 170 && letra <= 180) {
        resposta += 'r';

        continue;
      } else if (letra > 180 && letra <= 190) {
        resposta += 's';

        continue;
      } else if (letra > 190 && letra <= 200) {
        resposta += 't';

        continue;
      } else if (letra > 200 && letra <= 210) {
        resposta += 'u';

        continue;
      } else if (letra > 210 && letra <= 220) {
        resposta += 'v';

        continue;
      } else if (letra > 220 && letra <= 230) {
        resposta += 'w';

        continue;
      } else if (letra > 230 && letra <= 240) {
        resposta += 'x';

        continue;
      } else if (letra > 240 && letra <= 250) {
        resposta += 'y';

        continue;
      } else if (letra > 250 && letra <= 260) {
        resposta += 'z';

        continue;
      } else if (letra > 260 && letra <= 270) {
        resposta += ' ';

        continue;
      } else {
        resposta += '. Adeus.';
        flag = false;

        continue;
      }
    }
  } else {
    return msg.channel.send(utils.showError(400));
  }

  const resp = resposta.substring(0, 1).toUpperCase();
  resposta = resp + resposta.substring(1);

  if (resposta === '. Adeus.') {
    return msg.channel.send('Não sei dizer... Adeus.');
  }

  return msg.channel.send(resposta);
};

exports.help = {
  name: 'ouija',
  aliases: [],
  description: 'Retorna uma resposta estilo Ouija para uma pergunta.',
  args: [{
    name: 'Pergunta',
    expects: 'string',
    alias: ''
  }],
  usage: 'ouija [pergunta]',
  permission: 'Todos'
};