const jsonfile = require('jsonfile');
const logger = require('winston');

const userAgent = require('../lib/user-agent.js');
const scheduler = require('../lib/scheduler.js');

const subscriber = (getData, fileName, dataStore, keyName) => {
  const getFileUnlessExists = () => {
    jsonfile
      .readFile(fileName,
                (err, document) => {
                  if (err) {
                    logger.info('File not found. Downloading.');
                    userAgent(getData, fileName, dataStore);
                  } else {
                    logger.info('File found. Skipping download.');
                    dataStore[keyName] = document;
                  }
                });
  };

  return scheduler(getFileUnlessExists);
};

module.exports = subscriber;
