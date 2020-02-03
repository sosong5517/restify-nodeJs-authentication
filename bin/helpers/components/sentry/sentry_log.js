const config = require('../../../infra/configs/global_configs');
const raven = require('raven');

const sendError = async (errorMessage) => {
  raven.config(config.get('/dsnSentryUrl')).install();
  raven.captureMessage(errorMessage);
};

module.exports = {
  sendError
};
