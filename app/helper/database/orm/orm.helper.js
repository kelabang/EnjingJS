'use strict'
const Helper = require(__dirname + '/../../../super/helper.super.js')
class Orm extends Helper {
	constructor (di) {
		super()
		this.type = 'bookshelf'
		this.di = di
	}
	connect (connection) {
		this.connection = connection
		return this
	}
	extendModel(persistent) {
		if(!this.adapter){
			console.log('-- no adapter --')
			const name = this.ucFirst(this.type)+'Orm'
			this.adapter = this.di.container[name]
			this.adapter = this.adapter[this.type](this.connection.connect)
		}
		return this.adapter.Model.extend(persistent)
	}
	extendCollection(persistent) {
		if(!this.adapter){
			this.adapter = this.di.container[this.ucFirst(this.type)+'Orm']
		}
		return this.adapter.Collection.extend(persistent)
	}
}
module.exports = Orm