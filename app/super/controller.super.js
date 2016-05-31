'use strict'
const deps = require(__dirname + '/../dependency/controller.super.dependency.js')
class Controller {
	constructor () {}
	start(request, reply, nextMethod) {
		console.log('-->> controller start')
		const body = request.payload
		const query = request.query
		const params = request.params
		// console.log(body, "<< -- body raw request from node")
		// console.log(query, "<< -- query raw request from node")
		// console.log(params, "<< -- params raw request from node")
		console.log(nextMethod, "<< -- next method")
		if(typeof this[nextMethod] !== 'function'){
			return reply({
				"error" : "InvalidRequest",
				"message" : "cannot handle this request"
			})
		}
		return this[nextMethod](body, params, query, reply)
	}
}
module.exports = Controller