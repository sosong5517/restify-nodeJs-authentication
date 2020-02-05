const restify = require('restify');
const project = require('../../package.json');
const corsMiddleware = require('restify-cors-middleware')
const basicAuth = require('../auth/basic_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const userHandler = require('./modules/user/handler/api_handler')

function AppServer() {
    this.server = restify.createServer({
        name: `${project.name}-server`,
        version: project.version
    });
    this.server.serverKey = '';
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.authorizationParser());

    const corsConfig = corsMiddleware({
        preflightMaxAge: 5,
        origins: ['*'],
        // ['*'] -> to expose all header, any type header will be allow to access
        // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
        allowHeaders: ['Authorization'],
        exposeHeaders: ['Authorization']
    });
    this.server.pre(corsConfig.preflight);
    this.server.use(corsConfig.actual);
    // required for basic auth
    this.server.use(basicAuth.init());

    // anonymous can access the end point, place code bellow
    this.server.get('/', (req, res) => {
        wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
    });

    this.server.post('/api/users/v1/register', basicAuth.isAuthenticated, userHandler.registerUser);

}
module.exports = AppServer;
