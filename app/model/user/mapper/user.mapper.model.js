'use strict'
const Mapper = require(__dirname + '/../../../super/mapper.super.js')
class UserMapperModel extends Mapper {
	constructor (db, profileMapper) {
		super()
		this.mapper = db.extendModel({
			tableName: 'user',
			profile: function () {
				return this.hasOne(profileMapper.mapper)
			}
		})
	}
	findWithProfile(user) {
		return this.mapper
							.query((qb) => {
								qb 	.where('username', user.username)
									.orWhere('id', user.id)
							})
							.fetch({
								withRelated: ['profile']
							})
	}
	find(user) {
		return this.mapper
							.query((qb) => {
								qb 	.where('username', user.username)
									.orWhere('id', user.id)
							})
							.fetch()
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