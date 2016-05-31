'use strict'
const Core = require(__dirname + '/super/core.super.js')
class Server extends Core {
	constructor (server) {
		super()
		this.server = server
	}
	register (mod, cb) {
		return this.server.register(mod, cb)
	}
	route (route) {
		return this.server.route(route)
	}
	setup(cb) {
		this.server.connection({
			'port': this.config().port
		})
		return cb (null)
	}
	start (cb) {
		this.server.start((err) => {
			if(err) cb(err)
			console.log('Server running at:', this.server.info.uri);
		})
	}
}
module.exports = Server