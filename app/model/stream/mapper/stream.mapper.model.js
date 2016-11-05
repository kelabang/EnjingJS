'use strict'
const Mapper = require(__dirname + '/../../../super/mapper.super.js')
class StreamMapperModel extends Mapper {
	constructor (db, userMapper, galleryMapper) {
		super()
		this.mapper = db.extendModel({
			tableName: 'stream',
			user: function () {
				return this.belongsTo(userMapper.mapper)
			},
			gallery: function () {
				return this.belongsTo(galleryMapper.mapper)
			}
		})
	}
	save(stream) {
		console.log('-- stream mapper model --')
		let toInsert = {
			id: stream.id,
			user_id: stream.user_id,
			content: stream.content,
			gallery_id: stream.gallery_id,
			status: stream.status || 0,
			vote: 0,
			type: stream.type || 0,
			datecreated: stream.datecreated
		}
		return this._createMapper(toInsert).save(null, {method: 'insert'})
	}
	updateStatus (stream) {
		console.log('-- update --')
		let toUpdate = {}
		let where = {}
		where.id = stream.id
		toUpdate.status = stream.status
		return this._createMapper(where).save(toUpdate, {patch: true})
	}
	findType (stream) {
		console.log(':: findType')
		console.log(stream.type)
		let filter = {}
		if(stream.type) filter['type'] = stream.type
		if(stream.status) filter['status'] = stream.status
		return this._createMapper({})
		.where(filter)
		.fetchAll()
	}
 	findAll(stream) {
		return this._createMapper({
			'user_id': stream.user_id
		}).fetchAll({
			withRelated: ['user']
		})
	}
	findWithUser(stream) {
		return this._createMapper({
			id: stream.id
		}).fetch({
			withRelated: ['user']
		})
	}
}
module.exports = StreamMapperModel