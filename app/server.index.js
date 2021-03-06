'use strict'
const Core = require(__dirname + '/super/core.super.js')
const corsHeaders = require('hapi-cors-headers')
class Server extends Core {
	constructor (server) {
		super()
		this.server = server
	}
	register (mod, cb) {
		return this.server.register(mod, cb)
	}
	auth (param1, param2, config) {
		this.server.auth.strategy(param1, param2, config)
		this.server.auth.default(param1)
	}
	route (route) {
		return this.server.route(route)
	}
	setup(cb) {
		this.server.connection({
			'port': this.config().port,
			'routes': {
				cors: {
					credentials: true,
					origin: ['*'],

				}
			}
		})
		return cb (null)
	}
	start (cb) {
		this.server.start((err) => {
			if(err) cb(err)
			console.log('Server running at:', this.server.info.uri);
		})
		this.server.ext('onPreResponse', corsHeaders)
	}
}
module.exports = Server