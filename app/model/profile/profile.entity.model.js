'use strict'
class ProfileEntity {
	constructor (uuid, moment) {
		this.uuid = uuid
		this.moment = moment
	}
	set id (id) {
		this._id = id
		return this
	}
	get id () {
		return (this._id)? this._id: this.uuid.v4()
	}
	set user_id (user_id) {
		this._user_id = user_id
		return this
	}
	get user_id () {
		return this._user_id
	}
	set firstname (firstname) {
		this._firstname = firstname
		return this
	}
	get firstname () {
		return this._firstname
	}
	set lastname (lastname) {
		this._lastname = lastname
		return this
	}
	get lastname () {
		return this._lastname
	}
	set birthday (birthday) {
		this._birthday = birthday
		return this
	}
	get birthday () {
		return (this.moment(this._birthday, 'YYYY-MM-DD', true).isValid())? this._birthday: null
	}
	set location (location) {
		this._location = location
		return this
	}
	get location () {
		return this._location
	}
	set description (description) {
		this._description = description
		return this
	}
	get description () {
		return this._description
	}
	set type (type) {
		this._type = type
		return this
	}
	get type () {
		return this._type
	}
	set datecreated (date) {
		this._datecreated = date
		return this
	}
	get datecreated () {
		return (this.moment(this._datecreated, 'YYYY-MM-DD HH:mm:ss', true).isValid())? this._datecreated: this.moment().utc().format('YYYY-MM-DD HH:mm:ss') 
	}
}
class ProfileEntityModel  {
	constructor (uuid, moment) {
		this.uuid = uuid
		this.moment = moment
	}
	create () {
		return new ProfileEntity(this.uuid, this.moment)
	}
}
module.exports = ProfileEntityModel