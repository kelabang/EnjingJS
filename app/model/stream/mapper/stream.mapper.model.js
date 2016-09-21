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
			vote: 0,
			type: stream.type || 0,
			datecreated: stream.datecreated
		}
		return this._createMapper(toInsert).save(null, {method: 'insert'})
	}
	findType (stream) {
		console.log(':: findType')
		console.log(stream.type)
		return this._createMapper({})
		.where({
			'type': stream.type
		})
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