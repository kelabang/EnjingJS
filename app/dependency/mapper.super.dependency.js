'use strict'
const Bottle = require('bottlejs')
const bottle = new Bottle
const Moment = require('moment')
const UUID = require('node-uuid')
bottle.factory('UUID', (container) => {
	return UUID
})
bottle.factory('Moment', (container) => {
	return Moment
})
module.exports = bottle