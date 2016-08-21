'use strict'

const di = require('./dependency.index.js')

// const config = di.container.Config
// console.log(config)
const target = __dirname + '/config'

console.log('-- di container server --')
const server = di.container.Server

console.log('-- di container config --')
const config = di.container.Config

console.log('-- di container register --')
const register = di.container.Register

console.log('-- di container route --')
const route = di.container.Route

console.log('-- di container connection --')
const connection = di.container.Connection

console.log('-- di container authentication --')
const authentication = di.container.Authentication

config
		.setupAsync(target)
		.then((configuration) => {
			server.config(configuration.server)
			register.config(configuration.register)
			route.config(configuration.route)
			connection.config(configuration.database)
			authentication.config(configuration.auth)
			return server.setupAsync()
		})
		.then((data) => {
			console.log('-- server ready --')
			return register.doneAsync()
		})
		.then((data)=> {
			console.log('-- register ready --')
			return route.bindAsync()
		})
		.then(() => {
			console.log('-- server start --')
			server.start((err) => {
				console.log(err)
			})
		})	
		.error((err) => {
			console.log('-- config not ready --')
			console.error(err)
		})

return console.log('-- we can make it --')