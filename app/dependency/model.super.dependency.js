'use strict'
const Bottle = require('bottlejs')
const bottle = new Bottle
const Promise = require('bluebird')
bottle.factory('Promise', (container) => {
	return Promise
})
module.exports = bottle