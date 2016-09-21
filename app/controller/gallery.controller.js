'use strict'
console.log('!! gallery.controller.js')
const Controller = require(__dirname + '/../super/controller.super.js')
const owner = 'ma4m'
class GalleryController extends Controller {
	constructor (config, model) {
		console.log(':: constructor')
		super(config)
		this.model = model
	}
	getGallery (body, params, query, reply) {
		console.log(':: getGallery')
		let message = ''
		let output = []
		this.model.serviceGetGallery()
			.then((galleries) => {
				message = (galleries)? 'success get galleries': 'fail get galleries'
				output = galleries
				return reply({
					message: message,
					data: output
				})
			})
			.catch((err) => {
				console.error(err)
			}) 
	}
	postGallery (body, params, query, reply) {
		console.log(':: postGallery')
		console.log(body)
		let message = ''
		let output = []
		this.model.serviceAddGallery(body.name, body.caption, this._access_user.id, body.server, body.meta)
			.then((gallery) => {
				message = (gallery)? 'success upload gallery': 'fail upload gallery'
				output = gallery
				return reply({
					message: message,
					data: output
				})
			})
	}
	
	// below old routes
	// getSingleStream (body, params, query, reply) {
	// 	let message = ''
	// 	let output = []
	// 	this.model.serviceGetStream(params.streamId)
	// 		.then((stream) => {
	// 			message = (stream)? 'success get stream': 'fail get stream'
	// 			output = stream
	// 			return reply({
	// 				message: message,
	// 				data: output
	// 			})
	// 		})
	// 		.catch((err) => {
	// 			const error = this._badRequest('fail to get stream')
	// 			return reply(error)
	// 		})
		
	// }
	// postStream (body, params, query, reply) {
	// 	let message = ''
	// 	let output = []
	// 	this.model.serviceCreateStream(this._access_user.id, body.content)
	// 		.then((stream) => {
	// 			message = (stream)? 'success create stream': 'fail create stream'
	// 			output = stream
	// 			return reply({
	// 				message: message,
	// 				data: output
	// 			})
	// 		})
	// 		.catch((err) => {
	// 			const error = this._badRequest('fail to create stream')
	// 			return reply(error)
	// 		})
	// }
}
module.exports = GalleryController