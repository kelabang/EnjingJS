'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class StreamModel extends Model {
	constructor (streamEntity, streamMapper) {
		super()
		this.streamEntity = streamEntity
		this.streamMapper = streamMapper
		console.log('-->> stream model created ')
	}
	getFollowingStream (ownerStreamId) {
		console.log('>> get following stream')
		console.log(ownerUsername)
	}
}
module.exports = StreamModel