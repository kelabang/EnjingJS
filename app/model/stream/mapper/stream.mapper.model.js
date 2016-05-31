'use strict'
const Model = require(__dirname + '/../../../super/model.super.js')
class StreamMapperModel extends Model {
	constructor (db) {
		super()
		this.mapper = db.extendModel({
			tableName: 'stream'
		})
	}
}
module.exports = StreamMapperModel