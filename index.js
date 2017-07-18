const logger = require('winston');
const request = require('request-promise');

const subscriber = require('./lib/subscriber-daemon.js');
const scheduler = require('./lib/scheduler.js');

const data = {};

const retriever = (options) => {
  logger.info('Making remote API Request made to: ', options.uri);

  options.json = true;

  return request(options)
    .catch((e) => {
      throw Error(e);
    });
};

const placeholder = () => {
  const options = {};

  options.uri = 'https://jsonplaceholder.typicode.com/posts';

  return retriever(options);
};

const wikipedia = () => {
  const options = {};

  options.uri = 'https://en.wikipedia.org/w/api.php' +
    '?format=json&action=query&titles=Software_testing&prop=contributors';

  return retriever(options);
};

subscriber(placeholder, 'lorem.json', data, 'placeholder')
  .start();

subscriber(wikipedia, 'wikipedia.json', data, 'wiki')
  .start();

scheduler(() => {
  logger.info('Wiki data: ', data.wiki);
})
  .start();
