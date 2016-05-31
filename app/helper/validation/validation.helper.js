'use strict'
const Helper = require(__dirname + '/../../super/helper.super.js')
class Validation extends Helper {
	constructor (di) {
		super()
		this.di = di
		this.type = 'joi'
	}
	select (type) {
		this.type = type
		return this
	}
	ucFirst(string) {
		return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
	}
	translate(validation) {
		if(!this.adapter){
			this.adapter = this.di.container[this.ucFirst(this.type)+'Validation']
		}
		return this.adapter.translate(validation)
	}
}
module.exports = Validation