const Discord = require('discord.js');
const fs = require('fs');

const config = require('../config/config.json');

exports.run = (client, msg, args) => {
  if (args.find(arg => (arg.name === 'help' || arg.name === 'h') && arg.value.toString() === 'true')) {
    return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`${ config.prefix }help`)
      .setDescription('Retorna a descrição do bot, e uma lista de comandos. Também serve para retornar a descrição de cada comando. Exemplo: \`\`.help [comando]\`\`')
      .addField('**Aliases**', '``h``', true)
      .addField('**Argumentos**', '``Comando (string)``', true)
      .addField('**Como usar**', `\`\`${ config.prefix }help [comando]\`\``)
      .addField('**Permissão**', '``Todos``', true)
      .setColor(config.botColor)
      .setFooter(`${ config.prefix }help`)
    );
  }

  const arg = args.find(a => a.name === 'string1');

  if (arg) {
    const files = fs.readdirSync(__dirname);

    let command = files.find(file => file === `${ arg.value }.js`);

    if (!command) {
      let cmd;

      files.forEach(file => {
        cmd = require(`./${file}`);

        for (let i = 0; i < cmd.help.aliases.length; i++) {
          if (cmd.help.aliases[i] === arg.value) {
            command = file;
          }
        }
      })
    }

    if (command) {
      command = require(`./${command}`);

      return msg.channel.send(new Discord.MessageEmbed()
        .setTitle(`${ config.prefix }${command.help.name}`)
        .setDescription(command.help.description)
        .addField('**Aliases: **', command.help.aliases.length > 0 ? command.help.aliases.map(alias => `\`\`${alias}\`\``) : 'Não possui aliases.', true)
        .addField('**Argumentos: **', command.help.args.length > 0 ? command.help.args.map(a => (a.alias ? `\`\`${ a.name }` + ' | ' + a.alias : `\`\`${ a.name }`) + (a.expects ? ' (' + a.expects + ')``' : '``')) : '``Não possui argumentos.``', true)
        .addField('**Como usar**', `\`\`${ config.prefix }${ command.help.usage }\`\``)
        .addField('**Permissão**', `\`\`${ command.help.permission }\`\``, true)
        .setColor(config.botColor)
        .setFooter(`${ config.prefix }help`)
      );
    }
  }

  const files = fs.readdirSync(__dirname);

  const help = [];

  files.forEach(file => {
    const command = require(`./${file}`);

    help.push({
      name: `.${command.help.name}`,
      value: command.help.description,
      inline: true
    });
  });

  const embed = new Discord.MessageEmbed()
    .setTitle(config.botName)
    .setDescription(config.botDescription)
    .addFields(help)
    .setColor(config.botColor)
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setFooter(`${ config.prefix }help`)

  return msg.channel.send(embed);
};

exports.help = {
  name: 'help',
  aliases: [
    'h'
  ],
  description: 'Retorna a descrição do bot, e uma lista de comandos. Também serve para retornar a descrição de cada comando. Exemplo: \`\`.help [comando]\`\`',
  args: [{
    name: 'Comando',
    expects: 'string',
    alias: ''
  }],
  usage: 'help [comando]',
  permission: 'Todos'
}