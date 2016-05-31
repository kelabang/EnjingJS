'use strict'
class CategoryFollowEntity {
	constructor () {}
	set id (id) {
		this._id = id
		return this
	}
	get id () {
		return this._id
	}
	set user_id (user_id) {
		this._user_id = user_id
		return this
	}
	get user_id () {
		return this._user_id
	}
	set name (name) {
		this._name = name
		return this
	}
	get name () {
		return this._name
	}
	set description (description) {
		this._description = description
		return this
	}
	get description () {
		return this._description
	}
	set data (data) {
		this._data = data
		return this
	}
	get data () {
		return this._data
	}
}
class CategoryFollowEntityModel  {
	constructor () {}
	create () {
		return new CategoryFollowEntity()
	}
}
module.exports = CategoryFollowEntityModel