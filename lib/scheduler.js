const cron = require('cron');
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

module.exports = scheduler;
