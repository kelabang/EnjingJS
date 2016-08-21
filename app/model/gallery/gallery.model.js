'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class GalleryModel extends Model {
	constructor (galleryEntity, galleryMapper) {
		super()
		this.galleryEntity = galleryEntity
		this.galleryMapper = galleryMapper
	}
	serviceGetGallery() {
		console.log(':: serviceGetGallery')
		return new this.Promise((resolve, reject) => {

			this.galleryMapper.findAll()
				.then((galleries) => {
					let output = []
					galleries.map((gallery) => {
						output.push({
							id: gallery.get('id'),
							username: gallery.get('username'),
							name: gallery.get('name'),
							caption: gallery.get('caption'),
							server: gallery.get('server'),
							datecreated: gallery.get('datecreated')
						})
					})
					resolve(output)
				})
		})
	}
	serviceAddGallery (name, caption, username, server, meta) {
		console.log(':: serviceAddGallery')
		let gallery = this.galleryEntity.create()
		
		gallery.name = name
		gallery.username = username
		gallery.caption = caption
		gallery.server = server
		gallery.meta = meta

		return new this.Promise((resolve, reject) => {
			this.galleryMapper.save(gallery)
				.then((gallery) => {
					return resolve({
						'id': gallery.get('id')
					})
				})
				.error((err) => {
					return reject(err)
				})
		})
	}
	// getFollowingStream (ownerStreamId) {
	// 	console.log('>> get following stream')
	// 	console.log(ownerUsername)
	// }
	// serviceCreateStream (ownerId, content) {
	// 	let stream = this.streamEntity.create()
	// 	stream.user_id = ownerId
	// 	stream.content = content
	// 	return new this.Promise((resolve, reject) => {
	// 		this.streamMapper.save(stream)
	// 			.then((stream) => {
	// 				return resolve({
	// 					'id': stream.get('id')
	// 				})
	// 			})
	// 			.error((err) => {
	// 				return reject(err)
	// 			})
	// 	})
	// }
	// serviceGetStream (streamId) {
	// 	let stream = this.streamEntity.create()
	// 	stream.id = streamId
	// 	return new this.Promise((resolve, reject) => {
	// 		this.streamMapper.findWithUser(stream)
	// 			.then((stream) => {
	// 				let output = {}
	// 				output.id = stream.get('id')
	// 				output.content = stream.get('content')
	// 				output.vote = stream.get('vote')
	// 				output.user_id = stream.get('user_id')
	// 				output.user_username = stream.related('user').get('username')
	// 				return resolve(output)
	// 			})
	// 			.catch((err) => {
	// 				return reject(err)
	// 			})
	// 	})
	// }
	// serviceGetUserStream (userId) {
	// 	let stream = this.streamEntity.create()
	// 	stream.user_id = userId
	// 	return new this.Promise((resolve, reject) => {
	// 		this.streamMapper.findAll(stream)
	// 			.then((streams) => {
	// 				let output = []
	// 				streams.map((stream) => {
	// 					output.push({
	// 						id: stream.get('id'),
	// 						username: stream.related('user').get('username'),
	// 						content: stream.get('content')
	// 					})
	// 				})
	// 				return resolve(output)
	// 			})
	// 			.catch((error) => {
	// 				return reject(error)
	// 			})
	// 	})
	// }
}
module.exports = GalleryModel