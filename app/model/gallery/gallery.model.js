'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class GalleryModel extends Model {
	constructor (galleryEntity, galleryMapper, categoryGalleryEntity) {
		super()
		this.galleryEntity = galleryEntity
		this.galleryMapper = galleryMapper
		this.categoryGalleryEntity = categoryGalleryEntity
	}
	serviceGetGalleryId (id) {
		console.log(':: serviceGetGalleryId ', id)
		let gallery = this.galleryEntity.create()
		gallery.id = id
		return new this.Promise((resolve, reject) => {
			this.galleryMapper.findById(gallery)
				.then((gallery) => {
					console.log('> return gallery mapper')
					if(!gallery) return resolve()
					resolve({
						id: gallery.get('id'),
						name: gallery.get('name'),
						caption: gallery.get('caption'),
						server: gallery.get('server')
					})
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
	serviceGetGallery(category_id) {
		console.log(':: serviceGetGallery')
		let gallery = this.galleryEntity.create()
		category_id = (!category_id)? this.categoryGalleryEntity.create().id: category_id
		gallery.category_id = category_id
		return new this.Promise((resolve, reject) => {
			this.galleryMapper.findAll(gallery)
				.then((galleries) => {
					let output = []
					console.log('> result findAll', galleries)
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
	serviceAddGallery (name, caption, user_id, server, meta, category_id) {
		console.log(':: serviceAddGallery')
		let gallery = this.galleryEntity.create()

		category_id = (!category_id)? this.categoryGalleryEntity.create().id: category_id
		gallery.name = name
		gallery.user_id = user_id
		gallery.caption = caption
		gallery.server = server
		gallery.category_id = category_id
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