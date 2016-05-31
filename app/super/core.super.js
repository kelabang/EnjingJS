'use strict'
class Core {
	constructor () {}
	config(config) {
		if(!config){
			return this._config
		}
		this._config = config
	}
}
module.exports = Core