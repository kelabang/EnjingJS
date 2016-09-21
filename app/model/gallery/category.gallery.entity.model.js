/*
* @Author: Imam
* @Date:   2016-08-27 22:05:00
* @Last Modified by:   Imam
* @Last Modified time: 2016-08-27 22:09:45
*/

'use strict';

'use strict'
class CategoryGalleryEntity {
	constructor () {}
	set id (id) {
		this._id = id
		return this
	}
	get id () {
		return (this._id)? this._id: "ebfd88ef-9d3a-41e7-a528-990c6b67bb8c"
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
class CategoryGalleryEntityModel  {
	constructor () {}
	create () {
		return new CategoryGalleryEntity()
	}
}
module.exports = CategoryGalleryEntityModel