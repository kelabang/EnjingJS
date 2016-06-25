'use strict'
const Mapper = require(__dirname + '/../../../super/mapper.super.js')
class StreamMapperModel extends Mapper {
	constructor (db, userMapper) {
		super()
		this.mapper = db.extendModel({
			tableName: 'stream',
			user: function () {
				return this.belongsTo(userMapper.mapper)
			}
		})
	}
	save(stream) {
		console.log('-- stream mapper model --')
		let toInsert = {
			id: stream.id,
			user_id: stream.user_id,
			content: stream.content,
			vote: 0,
			datecreated: stream.datecreated
		}
		return this._createMapper(toInsert).save(null, {method: 'insert'})
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