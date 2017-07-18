const cron = require('cron');
const jsonfile = require('jsonfile');
const logger = require('winston');

const userAgent = require('../lib/user-agent.js');

const timeZoneName = 'America/New_York';
const eachSecond = '* * * * * *';

const scheduler = (tickHandler,
                   cronExpression = eachSecond) => {
  return new cron.CronJob({
    onTick: tickHandler,
    cronTime: cronExpression,
    timeZone: timeZoneName
  });
};

const subscriber = (getData, fileName, dataStore) => {
  const getFileUnlessExists = () => {
    jsonfile
      .readFile(fileName,
                (err, document) => {
                  if (err) {
                    logger.info('File not found. Downloading.');
                    userAgent(getData, fileName, dataStore);
                  } else {
                    logger.info('File found. Skipping download.');
                    dataStore.placeholder = document;
                  }
                });
  };

  return scheduler(getFileUnlessExists);
};

module.exports = subscriber;
