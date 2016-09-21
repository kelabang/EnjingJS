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
	getSingleStream (body, params, query, reply) {
		let message = ''
		let output = []
		this.model.serviceGetStream(params.streamId)
			.then((stream) => {
				message = (stream)? 'success get stream': 'fail get stream'
				output = stream
				return reply({
					message: message,
					data: output
				})
			})
			.catch((err) => {
				const error = this._badRequest('fail to get stream')
				return reply(error)
			})

	}
	postStream (body, params, query, reply) {
		console.log(':: postStream')
		let message = ''
		let output = []
		// console.log('>> access user ', this._access_user)
		this.model.serviceCreateStream(this._access_user.id, body.content, body.images)
			.then((stream) => {
				message = (stream)? 'success create stream': 'fail create stream'
				output = stream
				return reply({
					message: message,
					data: output
				})
			})
			.catch((err) => {
				const error = this._badRequest('fail to create stream')
				return reply(error)
			})
	}
}
module.exports = StreamController