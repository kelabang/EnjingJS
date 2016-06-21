'use strict'
const Controller = require(__dirname + '/../super/controller.super.js')
const owner = 'ma4m'
class StreamController extends Controller {
	constructor (config, model) {
		super(config)
		this.model = model
	}
	getFollowingStream (body, params, query, reply) {
		console.log('get following stream')
	}
	getUserStream (body, params, query, reply) {
		console.log('get user stream')
	}
	postStream (body, params, query, reply) {
		console.log('get user stream')
	}
}
module.exports = StreamController