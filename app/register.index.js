'use strict'
const Core = require(__dirname + '/super/core.super.js')
class Register extends Core {
	constructor (server) {
		super()
		this.server = server
		this.list = []
		this.modules = {}
	}
	done (cb) {
		var config = []
		var i = this.list.length
		while(i--) {
			config.push(this.modules[this.list[i]])
		}
		this.server.register(config, (err) => {
			cb(err)
		})
	}
}
module.exports = Register