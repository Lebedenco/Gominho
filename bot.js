const Discord = require('discord.js');
require('dotenv').config();
const io = require('socket.io-client');

const socket = io('http://pokebreed.herokuapp.com/', {
  reconnection: true, // whether to reconnect automatically
  reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
  reconnectionDelay: 1000, // how long to initially wait before attempting a new reconnection
  reconnectionDelayMax: 5000, // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
  randomizationFactor: 0.5
});

const config = require('./config/config.json');
const utils = require('./utils/utils');

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const token = process.env.TOKEN;
const diegoId = process.env.DIEGOID;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const loadCommands = () => {
  const fs = require('fs');

  let files = fs.readdirSync(__dirname + '/comandos');

  files.forEach(file => {
    let command = require(`./comandos/${file}`);

    client.commands.set(command.help.name, command);

    if (command.help.aliases) {
      command.help.aliases
        .filter(alias => alias.trim() !== '')
        .forEach(alias => client.aliases.set(alias, command.help.name));
    }
  });
};

const loadEvents = () => {
  const fs = require('fs');

  let files = fs.readdirSync(__dirname + '/eventos');

  files.forEach(file => {
    let events = require(`./eventos/${file}`);

    if (!Array.isArray(events)) {
      events = [events];
    }

    events.forEach(event => {
      client.on(event.name, (...args) => event.run(client, ...args));
    })
  })
};

const start = async () => {
  console.log(utils.getHoraAtual() + ' [INICIALIZAÇÃO] Iniciando...');

  await client.login(token).catch(err => {
    console.error(utils.getHoraAtual() + '[LOGIN] ', err);

    process.exit();
  });

  console.log(utils.getHoraAtual() + '[INICIALIZAÇÃO] Carregando eventos...');
  loadEvents();

  console.log(utils.getHoraAtual() + '[INICIALIZAÇÃO] Carregando comandos...');
  loadCommands();

  console.log(utils.getHoraAtual() + '[INICIALIZAÇÃO] Iniciando conexão com Pokébreed.socket...');

  //const diego = await client.users.fetch(diegoId);
  //const igor = await client.users.fetch('258038107528626176');

  //igor.send(`NOVO FOLLOW: ${ follow.name } às ${ utils.getHoraAtual() }`);
  //diego.send(`NOVO FOLLOW: ${ follow.name } às ${ utils.getHoraAtual() }`);

  socket.on('connect', () => {
    console.log(socket.connected);

    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect();
      }, 2000);
    });

    socket.on('report', report => {
      diego.send(new Discord.MessageEmbed()
        .setTitle(`Bug Report de: ${report.reporterName}`)
        .setDescription(report.report)
        .setTimestamp(report.time)
        .setColor(report.critical ? '#ff0000' : '#008000')
      );
    });

    socket.on('soundboard', sound => {
      const fs = require('fs');

      const files = fs.readdirSync(path(__dirname, 'sounds'));

      files.forEach(file => {
        console.log(file);
      });
    });
  });

  console.log('[INICIALIZAÇÃO CONCLUIDA]');
};

start();