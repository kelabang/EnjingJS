'use strict'
const Mapper = require(__dirname + '/../../../super/mapper.super.js')
class ProfileMapperModel extends Mapper {
	constructor (db) {
		super()
		this.mapper = db.extendModel({
			tableName: 'profile'
		})
	}
	// find(user) {
	// 	// return this._createMapper({
	// 	// 							username: user.username
	// 	// 						}).fetch()
	// 	// return this.mapper
	// 	// 					.where('username', user.username)
	// 	// 					.orWhere('id', user.id).fetch()
	// 	return this.mapper
	// 						.query((qb) => {
	// 							qb 	.where('username', user.username)
	// 								.orWhere('id', user.id)
	// 						})
	// 						.fetch()
	// }
	save(profile) {
		let toInsert = {
			id: profile.id,
			user_id: profile.user_id,
			firstname: profile.firstname,
			lastname: profile.lastname,
			birthday: profile.birthday,
			location: profile.location,
			description: profile.description,
			type: profile.type,
			datecreated: profile.datecreated
		}
		return this._createMapper(toInsert).save(null, {method: 'insert'})
	}
}
module.exports = ProfileMapperModel