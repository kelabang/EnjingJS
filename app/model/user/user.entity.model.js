'use strict'
class UserEntity {
	constructor (md5sum) {
		this.md5sum = md5sum
	}
	set id (id) {
		this._id = id
		return this
	}
	get id () {
		return this._id
	}
	set username (username) {
		this._username = username
		return this
	}
	get username () {
		return this._username
	}
	set name (name) {
		this._name = name
		return this
	}
	get name () {
		return this._name
	}
	set email (email) {
		this._email = email
		return this
	}
	get email () {
		return this._email
	}
	set password (password) {
		this._password = this.md5sum.update(password).digest('hex')
		return this
	}
	get password () {
		return this._password
	}	
}
class UserEntityModel  {
	constructor (crypto) {
		this.crypto = crypto
	}
	create () {
		const md5sum = this.crypto.createHash('md5')
		return new UserEntity(md5sum)
	}
}
module.exports = UserEntityModel