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
	verify (request, reply, nextMethod){
		let passed = true
		let token = null
		let authorization = (request.headers.authorization)? request.headers.authorization: null
		token = (authorization)? authorization.split('Bearer ')[1]: token
		if(!token) return reply(this.descriptor.unauthorized('request doesnt have permission'))
		this.authentication.verifyUserCredential(token)
						   .then((user) =>  {
						   		this._access_user = user // set access user
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

		const body = request.payload
		const query = request.query
		const params = request.params

		console.log(nextMethod, "<< -- next method")

		if(typeof this[nextMethod] !== 'function'){
			const error = this._badRequest()
			return reply(error)
		}
		return this[nextMethod](body, params, query, reply)
	}
}
module.exports = Controller