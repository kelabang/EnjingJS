'use strict'
const Mapper = require(__dirname + '/../../../super/mapper.super.js')
class UserMapperModel extends Mapper {
	constructor (db) {
		super()
		this.mapper = db.extendModel({
			tableName: 'user'
		})
	}
	find(user) {
		return this._createMapper({
									username: user.username
								}).fetch()
	}
	save(user) {
		return this._createMapper({
			id: this.uuid.v4(),
			username: user.username,
			email: user.email,
			password: user.password,
			datecreated: this.moment.utc().format('YYYY-MM-DD HH:mm:ss')
		}).save(null, {method: 'insert'})
	}
}
module.exports = UserMapperModel