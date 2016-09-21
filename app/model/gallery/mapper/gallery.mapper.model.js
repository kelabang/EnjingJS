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
			user_id: gallery.user_id,
			category_id: gallery.category_id,
			caption: gallery.caption,
			server: gallery.server,
			meta: gallery.meta,
			datecreated: gallery.datecreated
		}
		return this._createMapper(toInsert).save(null, {method: 'insert'})
	}
	_findAll() {
		console.log(':: findAll')
		return this._createMapper({})
		.fetchAll()
	}
	findAll(gallery) {
		console.log(':: findAll')
		console.log(gallery.category_id)
		return this._createMapper({}).where({
			category_id: gallery.category_id
		}).fetchAll()
	}
	findById(gallery) {
		console.log(':: findById')
		return this ._createMapper({})
					.where({
						id: gallery.id
					})
					.fetch()
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
	// 
}
module.exports = GalleryMapperModel