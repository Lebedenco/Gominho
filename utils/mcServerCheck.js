const net = require('net');

let ip = 0;
let port = 0;
let isOnline = false;
let mcServerVersion = 0;
let mcServerMOTD = '';
let mcServerCurPlayers = 0;
let mcServerMaxPlayers = 0;
let version = 0;

module.exports = {
  start: function(port, ip, timeout, callback) {
    this.ip = ip;
    this.port = port;

    if (typeof(timeout) === Function()) {
      callback = timeout;
      timeout = 10;
    }

    const server = net.connect(port, ip, () => {
      const buff = Buffer.from([0xFE, 0x01]);
      server.write(buff);
    })

    server.setTimeout(timeout * 1000);

    server.on('data', (data) => {
      const info = data.toString().split('\x00\x00\x00');

      if (info !== null && info.length >= 6) {
        this.isOnline = true;
        this.mcServerVersion = info[2].replace(/\u0000/g, '');
        this.mcServerMOTD = info[3].replace(/\u0000/g, '');
        this.mcServerCurPlayers = info[4].replace(/\u0000/g, '');
        this.mcServerMaxPlayers = info[5].replace(/\u0000/g, '');
      }
      else {
        this.isOnline = false;
      }

      callback();
      server.end();
    });

    server.on('timeout', () => {
      this.isOnline = false;
      
      callback();
      server.end();
    });

    server.on('end', () => {

    });

    server.on('error', (err) => {
      if(err.code === 'ENOTFOUND') {
        return;
      } else if(err.code === 'ECONNREFUSED') {
        return;
      } else if (err.code === 'ETIMEDOUT') {
        return;
      }

      callback();

      console.log(err);
    });
  }
}