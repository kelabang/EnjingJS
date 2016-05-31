'use strict'
class Helper {
	constructor () {
		this.type = null
		this.adapter = null		
	}
	ucFirst(string) {
		return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
	}
	select (type) {
		this.type = type
		return this
	}
}
module.exports = Helper