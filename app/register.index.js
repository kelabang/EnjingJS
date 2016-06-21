'use strict'
const Core = require(__dirname + '/super/core.super.js')
class Register extends Core {
	constructor (server, di) {
		super()
		this.di = di
		this.server = server
		this.list = []
		this.modules = {}
	}
	done (cb) {
		console.log('-->> in register done --')
		let config = this.config()
		let plugins = config.plugins
		let configure = []
		let after = []
		for (var key in plugins) {
		    // skip loop if the property is from prototype
		    if (!plugins.hasOwnProperty(key)) continue;
		    let obj = plugins[key];
		    configure.push({
		    	'register': this.di.container[key],
		    	'options': obj.options
		    })
		    after.push(obj.after)
		}
		this.server.register(configure, (err) => {
			after.map((i) => {
				if(i.deps){
					let obs = this.di.container[i.deps]
					console.log(i)
					console.log(obs, "< --")
					obs.select(i.type)[i.handler](this.server)
				}
			})
			cb(err)
		})
		// cb();
		// while(i--) {
		// 	config.push(this.modules[this.list[i]])
		// }
		// this.server.register(config, (err) => {
		// 	cb(err)
		// })
	}
}
module.exports = Register