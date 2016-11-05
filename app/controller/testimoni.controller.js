/*
* @Author: Imam
* @Date:   2016-08-21 18:02:05
* @Last Modified by:   Imam
* @Last Modified time: 2016-11-02 22:27:31
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
	getAllTestimoni (body, params, query, reply) {
		console.log(':: getAllTestimoni')
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
	getAllTestimoniEnable (body, params, query, reply) {
		console.log(':: getAllTestimoniEnable')
		let message = ''
		let output = []
		this.model.serviceGetTestimoniEnable()
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
	postTestimoniEnable (body, params, query, reply) {
		console.log(':: enableTestimoni')
		let message = ''
		let output = []
		this.model.serviceEnableTestimoni(body.id)
			.then((enabled) => {
				message = (enabled)? 'success enable testimoni': 'fail enable testimoni'
				output = enabled
				return reply({
					message: message,
					data: output
				})
			})
	}
	postTestimoniDisable (body, params, query, reply) {
		console.log(':: disableTestimoni')
		let message = ''
		let output = []
		this.model.serviceDisableTestimoni(body.id)
			.then((enabled) => {
				message = (enabled)? 'success disable testimoni': 'fail disable testimoni'
				output = enabled
				return reply({
					message: message,
					data: output
				})
			})
	}
}

module.exports = TestimoniController