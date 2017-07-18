const jsonfile = require('jsonfile');
const logger = require('winston');

const userAgent = (getData, fileName, dataStore, keyName) => {
  getData()
    .then((result) => {
      dataStore[keyName] = result;
      logger.info('Got response data.');

      jsonfile
        .writeFile(fileName,
                   dataStore[keyName],
                   (writeErr) => {
                     if (writeErr) {
                       throw Error(writeErr);
                     }
                   });
      logger.info('Wrote response JSON to file.');
    });
};

module.exports = userAgent;
