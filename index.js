const subscriber = require('./lib/subscriber-daemon.js');

const placeholder = require('./lib/placeholder-api.js');

const data = {};

subscriber(placeholder, 'TEMP.json', data)
  .start();
