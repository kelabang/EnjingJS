/*
* @Author: Imam
* @Date:   2016-08-21 18:02:05
* @Last Modified by:   Imam
* @Last Modified time: 2016-08-28 02:24:55
*/

'use strict';

const Controller = require(__dirname + '/../super/controller.super.js')
const owner = 'ma4m'
class TestimoniController extends Controller {
	constructor (config, model) {
		super(config)
		this.model = model
	}
	getTestimoni (body, params, query, reply) {
		console.log(':: getTestimoni')
		let message = ''
		let output = []
		this.model.serviceGetTestimoni()
			.then((testimonies) => {
				message = 'success get testimoni'
				output = testimonies
				return reply({
					message: message,
					data: output
				})
			})
	}
	postTestimoni (body, params, query, reply) {
		console.log(':: postTestimoni')
		let message = ''
		let output = []
		this.model.serviceCreateTestimoni(null, body.content, body.images)
			.then((testimoni) => {
				message = (testimoni)? 'success create testimoni':'fail create testimoni'
				output = testimoni
				return reply({
					message: message,
					data: output
				})
			})
	}
}

module.exports = TestimoniController