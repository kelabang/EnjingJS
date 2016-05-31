'use strict'
const di = require(__dirname + '/../dependency/mapper.super.dependency.js')
class Mapper {
	constructor () {
		this.uuid = di.container.UUID
		this.moment = di.container.Moment
	}
	_createMapper(entity) {
		return new this.mapper(entity)
	}
}
module.exports = Mapper