const Bottle = require('bottlejs')
const Hapi = require('hapi')
const bottle = new Bottle()
const Route = require('./route.index.js')
const Register = require('./register.index.js')
const Config = require('./config.index.js')
const Server = require('./server.index.js')
const Prom = require('bluebird')
const fs = require('fs')
const joi = require('joi')

bottle = require(__dirname + '/dependency/helper.dependency.js')(bottle)
bottle = require(__dirname + '/dependency/entity.dependency.js')(bottle)
bottle = require(__dirname + '/dependency/model.dependency.js')(bottle)
bottle = require(__dirname + '/dependency/controller.dependency.js')(bottle)

bottle.factory('Bottle', (container) => {
	return bottle
}) // inception
bottle.factory('Promise', (container) => {
	return Prom
})
bottle.factory('fs', (container) => {
	const promise = container.Promise
	return promise.promisifyAll(fs)
})
bottle.factory('Config', (container) => {
	const fs = container.fs
	const promise = container.Promise
	return promise.promisifyAll(new Config(fs, promise))
})
bottle.factory('Server', (container) => {
	const server = new Hapi.Server
	const promise = container.Promise
	return promise.promisifyAll(new Server(server))
})
bottle.factory('Register', (container) => {
	const server = container.Server
	const promise = container.Promise
	return promise.promisifyAll(new Register(server))
})
bottle.factory('Route', (container) => {
	const fs = container.fs
	const server = container.Server
	const promise = container.Promise
	const bottle = container.Bottle
	const validation = container.Validation
	return promise.promisifyAll(new Route(fs, server, validation, bottle))
})
module.exports = bottle