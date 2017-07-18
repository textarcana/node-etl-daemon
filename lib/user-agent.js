const jsonfile = require('jsonfile');
const logger = require('winston');

const userAgent = (getData, fileName, dataStore) => {
  getData()
    .then((result) => {
      dataStore.placeholder = result;
      logger.info('Got response data.');

      jsonfile
        .writeFile(fileName,
                   dataStore.placeholder,
                   (writeErr) => {
                     if (writeErr) {
                       throw Error(writeErr);
                     }
                   });
      logger.info('Wrote response JSON to file.');
    });
};

module.exports = userAgent;
