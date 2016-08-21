'use strict'
const deps = require(__dirname + '/../dependency/controller.super.dependency.js')
class Controller {
	constructor (config) {
		this.authentication = config.authentication
		this.descriptor = config.descriptor
	}
	_badRequest (message) {
		message = (message)? message: 'cannot handle this request'
		return this.descriptor.badRequest(message)
	}
	_generateAccessUser (raw) {
		if(!raw) return false
		let user = {}
		user.username = raw.use
		user.email = raw.ema
		user.id = raw.id
		return user
	}
	refresh (request, reply, nextMethod) {
		console.log(':: refresh')
		let passed = true
		let token = null
		let authorization = (request.headers.authorization)? request.headers.authorization: null
		token = (authorization)? authorization.split('Bearer ')[1]: token
		if(!token) return reply(this.descriptor.unauthorized('request doesnt have permission'))
		this.authentication.verifyRefreshCredential(token)
						   .then((user) =>  {
						   		// this._access_user = user // set access user
						   		this._access_user = this._generateAccessUser(user) // set access user
						   		if(!this._access_user) return this.descriptor.unauthorized('request doesnt have permission')
						   		return this.start.apply(this, arguments)
						   })
						   .error((err) => {
						   		const error = this.descriptor.unauthorized('request doesnt have permission')
						   		return reply(err)
						   })
						   .catch((err) => {
						   		const error = this.descriptor.unauthorized('request doesnt have permission')
						   		return reply(err)
						   })
	}
	verify (request, reply, nextMethod){
		let passed = true
		let token = null
		let authorization = (request.headers.authorization)? request.headers.authorization: null
		token = (authorization)? authorization.split('Bearer ')[1]: token
		if(!token) return reply(this.descriptor.unauthorized('request doesnt have permission'))
		this.authentication.verifyUserCredential(token)
						   .then((user) =>  {
						   		// this._access_user = user // set access user
						   		this._access_user = this._generateAccessUser(user) // set access user
						   		if(!this._access_user) return this.descriptor.unauthorized('request doesnt have permission')
						   		return this.start.apply(this, arguments)
						   })
						   .error((err) => {
						   		const error = this.descriptor.unauthorized('request doesnt have permission')
						   		return reply(err)
						   })
						   .catch((err) => {
						   		const error = this.descriptor.unauthorized('request doesnt have permission')
						   		return reply(err)
						   })
	}
	start (request, reply, nextMethod) {
		console.log(':: start')
		const body = request.payload
		const query = request.query
		const params = request.params

		console.log(nextMethod, "<< -- next method")

		console.log(this[nextMethod], "<< -- next function content ")

		if(typeof this[nextMethod] !== 'function'){
			const error = this._badRequest()
			return reply(error)
		}

		function _reply () {
			console.log(':: _reply')
			reply.apply(null, arguments)
		}

		return this[nextMethod](body, params, query, _reply)
	}
}
module.exports = Controller