'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class StreamModel extends Model {
	constructor (streamEntity, streamMapper) {
		super()
		this.streamEntity = streamEntity
		this.streamMapper = streamMapper
	}
	getFollowingStream (ownerStreamId) {
		console.log('>> get following stream')
		console.log(ownerUsername)
	}
	serviceCreateStream (ownerId, content) {
		let stream = this.streamEntity.create()
		stream.user_id = ownerId
		stream.content = content
		return new this.Promise((resolve, reject) => {
			this.streamMapper.save(stream)
				.then((stream) => {
					return resolve({
						'id': stream.get('id')
					})
				})
				.error((err) => {
					return reject(err)
				})
		})
	}
	serviceGetStream (streamId) {
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