/*
* @Author: Imam
* @Date:   2016-08-21 18:34:25
* @Last Modified by:   Imam
* @Last Modified time: 2016-08-21 18:36:10
*/

'use strict';

'use strict'
// const Model = require(__dirname + '/../../super/model.super.js')
class TestimoniEntity {
	constructor (uuid, moment) {
		this.uuid = uuid
		this.moment = moment
	}
	set id (id) {
		this._id = id
		return this
	}
	get id () {
		return (!this._id)? this.uuid.v4(): this._id
	}
	set username (username) {
		this._username = username
		return this
	}
	get username () {
		return this._username
	}
	set content (content) {
		this._content = content
		return this
	}
	get content () {
		return this._content
	}
	set vote (vote) {
		this._vote = vote
		return this
	}
	get vote () {
		return this._vote
	}
	set stream_id (stream_id) {
		this._stream_id = stream_id
		return this
	}
	get stream_id () {
		return this._stream_id
	}
	get type () {
		return 1
	}
	set datecreated (datecreated) {
		this._datecreated = datecreated
		return this
	}
	get datecreated () {
		return (!this._datecreated)? this.moment().utc().format('YYYY-MM-DD HH:mm:ss'): this._datecreated 
	}	
}
class TestimoniEntityModel  {
	constructor (uuid, moment) {
		this.uuid = uuid 
		this.moment = moment
	}
	create () {
		return new TestimoniEntity(this.uuid, this.moment)
	}
}
module.exports = TestimoniEntityModel