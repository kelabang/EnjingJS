'use strict'
const Helper = require(__dirname + '/../../super/helper.super.js')

class Authenticator {
	constructor (adapter, configuration) {
		this.adapter = adapter
		this.configuration = configuration
		this.privatePath = __dirname + '/../../' + this.configuration.private
		this.publicPath = __dirname + '/../../' + this.configuration.public
	}
	sign (payload) {
		console.log('-->> authenticator :: sign ')
		return this.adapter.signAsync(payload, this.privatePath, this.publicPath)
	}
	verify(token) {
		console.log('-->> authenticator verify ')
		return this.adapter.verifyAsync(token, this.publicPath)
	}
	verifyUserCredential(token) {
		console.log('--> authenticator generate user credential')
		if(!token) return null
		let decoded = this.adapter.decode(token)
		let _public = this.publicPath + '/' + decoded.payload.id + '_adr.pub'
		return this.adapter.verifyAsync(token, _public)
	}
	verifyRefreshCredential(token) {
		console.log('--> authenticator verify refresh credential')
		if(!token) return null
		let decoded = this.adapter.decode(token)
		console.log('decoded ', decoded)
		if(!decoded.payload) return null
		if(decoded.payload.typ !== 'refresh') return null
		let _public = this.publicPath + '/' + decoded.payload.id + '_adr.pub'
		return this.adapter.verifyAsync(token, _public)
	}
	generateUserCredential(user) {
		console.log('--> authenticator generate user credential')
		let payload = {
			'use': user.username,
			'ema': user.email,
			'id': user.id,
		}
		let _private = this.privatePath + '/' + user.id + '_adr.piv'
		return this.adapter.generateAsync(payload, _private)
	}
	generateUserRefresh(user) {
		console.log('--> authenticator generate user refresh')
		let payload = {
			'use': user.username,
			'ema': user.email,
			'id': user.id,
			'typ': 'refresh'
		}
		let _private = this.privatePath + '/' + user.id + '_adr.piv'
		return this.adapter.generateRefreshAsync(payload, _private)
	}
}

class Authentication extends Helper {
	constructor (di) {
		super()
		this.di = di
		this.type = 'jwt'
		this.authenticator = {}
	}
	select (type) {
		this.type = type
		return this
	}
	create (type) {
		// if(this.authenticator['pem']) return this.authenticator['pem']
		let _type = (type)? type: this.type 
		if(this.authenticator[_type]) return this.authenticator[_type]
		if(!this.adapter){
			const name = this.ucFirst(this.type)+'Authentication'
			this.adapter = this.di.container[name]
		}
		const c = new Authenticator(this.adapter, this.configuration[this.type])
		this.authenticator[_type] = c
		return c
	}
	config (configuration) {
		console.log('-->> set config authorization')
		this.configuration = configuration
	}
	ucFirst(string) {
		return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
	}
	generatePassword (password) {
		const md5sum = this.di.container.Crypto.createHash('md5')
		return  md5sum.update(password).digest('hex')
	}
}
module.exports = Authentication