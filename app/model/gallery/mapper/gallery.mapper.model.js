'use strict'
const Mapper = require(__dirname + '/../../../super/mapper.super.js')
class GalleryMapperModel extends Mapper {
	constructor (db, userMapper) {
		super()
		this.mapper = db.extendModel({
			tableName: 'gallery',
			user: function () {
				return this.belongsTo(userMapper.mapper)
			}
		})
	}
	save(gallery) {
		console.log(':: save')
		let toInsert = {
			id: gallery.id,
			name: gallery.name,
			username: gallery.username,
			caption: gallery.caption,
			server: gallery.server,
			meta: gallery.meta,
			datecreated: gallery.datecreated
		}
		return this._createMapper(toInsert).save(null, {method: 'insert'})
	}
	findAll() {
		console.log(':: findAll')
		return this._createMapper({})
		.fetchAll()
	}
	// findAll(stream) {
	// 	console.log(':: findAll')
	// 	return this._createMapper({
	// 		'user_id': stream.user_id
	// 	}).fetchAll({
	// 		withRelated: ['user']
	// 	})
	// }
	// findWithUser(stream) {
	// 	console.log(':: findWithUser')
	// 	return this._createMapper({
	// 		id: stream.id
	// 	}).fetch({
	// 		withRelated: ['user']
	// 	})
	// }
}
module.exports = GalleryMapperModel