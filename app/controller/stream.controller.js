'use strict'
const Controller = require(__dirname + '/../super/controller.super.js')
class StreamController extends Controller {
	constructor (model) {
		super()
		this.model = model
	}
	getFollowingStream (body, params, query, reply) {
		console.log('get following stream')
	}
}
module.exports = StreamController