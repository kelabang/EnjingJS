'use strict'
class GalleryEntity {
	constructor (uuid, moment) {
		console.log(':: constructor GalleryEntity')
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
	set datecreated (datecreated) {
		this._datecreated = datecreated
		return this
	}
	get datecreated () {
		return (!this._datecreated)? this.moment().utc().format('YYYY-MM-DD HH:mm:ss'): this._datecreated 
	}
}
class GalleryEntityModel  {
	constructor (uuid, moment) {
		console.log(':: constructor')
		this.uuid = uuid 
		this.moment = moment
	}
	create () {
		console.log(':: create')
		return new GalleryEntity(this.uuid, this.moment)
	}
}
module.exports = GalleryEntityModel