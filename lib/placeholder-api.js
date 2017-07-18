const logger = require('winston');
const request = require('request-promise');

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const main = () => {

  logger.info('Remote API Request was made to: ', apiUrl);

  const options = {
    uri: apiUrl,
    json: true
  };

  return request(options);

};

module.exports = main;
