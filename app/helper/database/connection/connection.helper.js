'use strict'
const Helper = require(__dirname + '/../../../super/helper.super.js')
class Connector {
	constructor (connect) {
		this._connect = connect
		this.prototype = this.connect
	}
	get connect () {
		return this._connect
	}
}
class Connection extends Helper {
	constructor (di) {
		super()
		this.type = 'knex'
		this.di = di
		this.connector = {}
	}
	config (configuration) {
		this.configuration = configuration
	}
	create (config_name) {
		if(this.connector[config_name]) return this.connector[config_name]
		if(!this.adapter){
			const name = this.ucFirst(this.type)+'Connection'
			this.adapter = this.di.container[name]
		}
		const c = new Connector(this.adapter.connect(this.configuration[config_name]))
		this.connector[config_name] = c
		return c
	}
}
module.exports = Connection