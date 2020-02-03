require('dotenv').config();
const confidence = require('confidence');
const config = {
    port: process.env.PORT,
    basicAuthApi: [
        {
            username: process.env.BASIC_AUTH_USERNAME,
            password: process.env.BASIC_AUTH_PASSWORD
        }],
    dsnSentryUrl: process.env.DSN_SENTRY_URL,
};
const store = new confidence.Store(config);

exports.get = key => store.get(key);
