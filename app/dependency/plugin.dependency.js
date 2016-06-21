'use strict'

const Hapi = require('hapi')
const Prom = require('bluebird')
const fs = require('fs')
const Nes = require('nes')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')
const Pem = require('pem')
const Joi = require('joi')
const knex = require('knex')
const bookshelf = require('bookshelf')
const Crypto = require('crypto')
const Moment = require('moment')
const UUID = require('node-uuid')

module.exports = (bottle) => {

	bottle.factory('Hapi', (container) => {
		return Hapi
	})
	bottle.factory('Promise', (container) => {
		return Prom
	})
	bottle.factory('fs', (container) => {
		const promise = container.Promise
		return promise.promisifyAll(fs)
	})
	bottle.factory('nes', () => {
		return Nes
	})
	bottle.factory('Boom', () => {
		return Boom
	})
	bottle.factory('Pem', () => {
		return Pem
	})
	bottle.factory('Jwt', (container) => {
		return Jwt
	})
	bottle.factory('joi', (container) => {
		return Joi
	})
	bottle.factory('bookshelf', (container) => {
		return bookshelf
	})
	bottle.factory('knex', (container) => {
		return knex
	})
	bottle.factory('Crypto', (container) => {
		return Crypto
	})
	bottle.factory('UUID', (container) => {
		return UUID
	})
	bottle.factory('Moment', (container) => {
		return Moment
	})

	return bottle

}