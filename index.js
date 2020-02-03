const AppServer = require('./bin/app/server');
const configs = require('./bin/infra/configs/global_configs');
const logger = require('./bin/helpers/utils/logger')

const appServer = new AppServer();
const port = process.env.port || configs.get('/port')|| 1337;


appServer.server.listen(port, () => {
	const ctx = 'app-listen';
	logger.log(ctx, `${appServer.server.name} started, listening at ${appServer.server.url}`, 'initate application');
	
});



//___________________________________
/**
 * Module Dependencies
 */
// const config = require('./config')
// const restify = require('restify')
// const mongoose = require('mongoose')
// const restifyPlugins = require('restify-plugins')


// /**
//   * Initialize Server
//  */
// const server = restify.createServer({
// 	name: config.name,
// 	version: config.version,
// 	ignoreTrailingSlash: true
// })


// /**
//   * Middleware
//  */
// server.use(restifyPlugins.jsonBodyParser({ mapParams: true }))
// server.use(restifyPlugins.acceptParser(server.acceptable))
// server.use(restifyPlugins.queryParser({ mapParams: true }))
// server.use(restifyPlugins.fullResponse())


// /**
//   * Start Server, Connect to DB & Require Routes
// */
// server.listen(config.port, () => {
// 	// establish connection to mongodb
// 	mongoose.Promise = global.Promise;
// 	mongoose.connect(config.db.uri, { useNewUrlParser: true })

// 	const db = mongoose.connection

// 	db.on('error', (err) => {
// 	    console.error(err)
// 	    process.exit(1)
// 	});

// 	db.once('open', () => {
// 	    require('./src/routers')(server)
// 	    console.log(`Server is listening on port ${config.port}`)
// 	});
//});