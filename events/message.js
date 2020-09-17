const Discord = require('discord.js');

const utils = require('../utils/utils');
const config = require('../config/config.json');

const prefix = config.prefix;
const botID = config.botID;
const ownerID = config.ownerID;

const message = async (client, msg) => {
  if (msg.author.id === botID) {
    return;
  }

  if (msg.channel instanceof Discord.DMChannel) {
    const diego = client.users.cache.get(ownerID);

    diego.send(`${ msg.author }: ${ msg.content }`);
  }

  if (!msg.content.startsWith(prefix)) {
    return;
  }

  const args = utils.getArgs(msg.content.split(' ').slice(1));
  const cmd = msg.content.split(' ')[0];

  const command = getCommand(client, cmd);

  if (command) {
    console.log(`[COMANDO.${ command.help.name }.Run] Argumentos: ${ args.length > 0 ? args.map(arg => ` ${ arg.name } = ${ arg.value }`) : ' ' }`);
    command.run(client, msg, args)
  }
};

const getCommand = (client, commandName) => {
  commandName = commandName.slice(`${ prefix }`.length);

  let command = client.commands.get(commandName);

  if (!command) {
    command = client.commands.get(client.aliases.get(commandName));
  }

  return command
}

module.exports = {
  name: 'message',
  run: message
}