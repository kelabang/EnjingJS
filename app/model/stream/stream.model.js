'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class StreamModel extends Model {
	constructor (streamEntity, streamMapper, galleryModel) {
		super()
		this.streamEntity = streamEntity
		this.streamMapper = streamMapper
		this.galleryModel = galleryModel
	}
	getFollowingStream (ownerStreamId) {
		console.log('>> get following stream')
		console.log(ownerUsername)
	}
	serviceUploadingStream (userid, images) {
		console.log(':: serviceUploadingStream')
		console.log('> build sub gallery ')
		const categoryid = "5982624a-71f0-46a3-bc58-2d495c3d4099"
		return new this.Promise((resolve, reject) => {
			let que = images.map((image) => {
				return new this.Promise((resolve, reject) => {
					console.log('> service model not found ')
					this.galleryModel.serviceAddGallery(image.name, image.caption, userid, image.server, image.meta, categoryid)
						.then((gallery) => {
							resolve(gallery)
						})
						.error((err) => {
							console.error("! error serviceAddGallery")
							reject(err)
						})
				})
			})
			console.log('> build all gallery')
			this.Promise.all(que) // save images
				.then((images) => {
					let images_id = images.map((image) => {
						console.log('> result gallery ', image)
						return image.id
					})
					resolve(images_id)
				})
		})
	}
	serviceCreateTestimoni(ownerId, content, images) {
		console.log(':: serviceCreateTestimoni')
		const TESTIMONI = 1 // testimoni type
		const STATUS = 0 // status type
		return this.serviceCreateStream(ownerId, content, images, TESTIMONI, STATUS) //
	}
	serviceCreateStream (ownerId, content, images, type, status) {
		console.log(':: serviceCreateStream')
		let stream = this.streamEntity.create()
		stream.user_id = ownerId
		stream.content = content
		stream.type = type
		stream.status = status
		return new this.Promise((resolve, reject) => {
			this.serviceUploadingStream(ownerId, images)
				.then((galleries) => {
					console.log('> result serviceUploadingStream ')
					console.log(galleries)
					stream.gallery_id = galleries.join()
					return this.streamMapper.save(stream)
				})
				.then((stream) => {
					resolve({
						'id': stream.get('id')
					})
				})
				.error((err) => {
					reject(err)
				})
		})
	}
	serviceEnableTypeTestimoni(id) {
		console.log(':: service enable type testimoni')
		return this.serviceEnableStream(id)
	}
	serviceDisableTypeTestimoni(id) {
		console.log(':: service enable type testimoni')
		return this.serviceDisableStream(id)
	}
	serviceEnableStream (streamId) {
		let stream = this.streamEntity.create()
		stream.status = 1
		stream.id = streamId
		return this.streamMapper.updateStatus(stream)
			.then((stream) => {
				return {
					'id': stream.get('id')
				}
			})
	}
	serviceDisableStream (streamId) {
		let stream = this.streamEntity.create()
		stream.status = 0
		stream.id = streamId
		return this.streamMapper.updateStatus(stream)
			.then((stream) => {
				return {
					'id': stream.get('id')
				}
			})
	}
	serviceGetStream (streamId) {
		console.log(':: serviceGetStream')
		let stream = this.streamEntity.create()
		stream.id = streamId
		return new this.Promise((resolve, reject) => {
			this.streamMapper.findWithUser(stream)
				.then((stream) => {
					let output = {}
					output.id = stream.get('id')
					output.content = stream.get('content')
					output.vote = stream.get('vote')
					output.user_id = stream.get('user_id')
					output.user_username = stream.related('user').get('username')
					return resolve(output)
				})
				.catch((err) => {
					return reject(err)
				})
		})
	}
	serviceRetreiveImage (stream) {
		console.log(':: serviceRetreiveImage')
		console.log(stream)
		return new this.Promise((resolve, reject) => {
			this.Promise
			.map(stream.images, (gallery) => {
				return this.galleryModel.serviceGetGalleryId(gallery)
			})
			.then((images) => {
				stream.images = images
				resolve(stream)
			})
			.catch((err) => {
				reject(err)
			})
		})
	}
	serviceGetTypeAllTestimoni () {
		console.log(':: serivceGetTypeAllTestimoni')
		let type = 1
		let stream = this.streamEntity.create()
		stream.type = type
		return new this.Promise((resolve, reject) => {
			this.streamMapper.findType(stream)
				.then((streams) => {
					let output = []
					console.log(':: output stream mapper findatype')
					console.log(streams)
					streams.map((stream) => {
						console.log('> stream loop ')
						let galleries = stream.get('gallery_id').split(',') || []
						output.push({
							id: stream.get('id'),
							content: stream.get('content'),
							images: galleries,
							status: stream.get('status'),
							datecreated: stream.get('datecreated'),
						})
					})
					return output
				})
				.then((output) => {
					return this.Promise.map(output, (stream) => {
						return this.serviceRetreiveImage(stream)
					})
				})
				.then((streams) => {
					resolve(streams)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}
	serviceGetTypeTestimoniEnable () {
		console.log(':: serviceGetTypeTestimoniEnable')
		let type = 1
		let status = 1
		let stream = this.streamEntity.create()
		stream.type = type
		stream.status = status
		return new this.Promise((resolve, reject) => {
			this.streamMapper.findType(stream)
				.then((streams) => {
					let output = []
					console.log('> result findType')
					console.log(streams)
					streams.map((stream) => {
						console.log('> stream loop gallery ')
						let galleries = stream.get('gallery_id').split(',') || []
						output.push({
							id: stream.get('id'),
							content: stream.get('content'),
							images: galleries,
							datecreated: stream.get('datecreated')
						})
					})
					return output
				})
				.then((output) => {
					return this.Promise.map(output, (stream) => {
						return this.serviceRetreiveImage(stream)
					})
				})
				.then((streams) => {
					resolve(streams)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}
	serviceGetTypeTestimoni () {
		console.log(':: serviceGetTypeTestimoni')
		let type = 1
		let stream = this.streamEntity.create()
		stream.type = type
		return new this.Promise((resolve, reject) => {
			this.streamMapper.findType(stream)
				.then((streams) => {
					let output = []
					console.log('> result findType')
					console.log(streams)
					streams.map((stream) => {
						console.log('> stream loop gallery ')
						let galleries = stream.get('gallery_id').split(',') || []
						output.push({
							id: stream.get('id'),
							content: stream.get('content'),
							images: galleries,
							status: stream.get('status'),
							datecreated: stream.get('datecreated'),
						})
					})
					return output
				})
				.then((output) => {
					return this.Promise.map(output, (stream) => {
						return this.serviceRetreiveImage(stream)
					})
				})
				.then((streams) => {
					resolve(streams)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}
	serviceGetUserStream (userId) {
		let stream = this.streamEntity.create()
		stream.user_id = userId
		return new this.Promise((resolve, reject) => {
			this.streamMapper.findAll(stream)
				.then((streams) => {
					let output = []
					streams.map((stream) => {
						output.push({
							id: stream.get('id'),
							username: stream.related('user').get('username'),
							content: stream.get('content')
						})
					})
					return resolve(output)
				})
				.catch((error) => {
					return reject(error)
				})
		})
	}
}
module.exports = StreamModel