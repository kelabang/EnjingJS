'use strict'
class FollowEntity {
	constructor () {}
	set follow_category_id (follow_category_id) {
		this._follow_category_id = follow_category_id
		return this
	}
	get follow_category_id () {
		return this._follow_category_id
	}
	set follow_id (follow_id) {
		this._follow_id = follow_id
		return this
	}
	get follow_id () {
		return this._follow_id
	}
	set follow_type_id (follow_type_id) {
		this._follow_type_id = follow_type_id
		return this
	}
	get follow_type_id () {
		return this._follow_type_id
	}
}
class FollowEntityModel  {
	constructor () {}
	create () {
		return new FollowEntity()
	}
}
module.exports = FollowEntityModel