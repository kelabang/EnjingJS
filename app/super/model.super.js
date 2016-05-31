'use strict'
const di = require(__dirname + '/../dependency/model.super.dependency.js')
class Model {
	constructor () {
		this.Promise = di.container.Promise
	}
}
module.exports = Model