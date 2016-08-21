'use strict'

const Authentication = require(__dirname + '/../helper/authentication/authentication.helper.js')
const JwtAuthentication = require(__dirname + '/../helper/authentication/adapter/jwt.authentication.helper.js')

const Validation = require(__dirname + '/../helper/validation/validation.helper.js')
const JoiValidation = require(__dirname + '/../helper/validation/adapter/joi.validation.helper.js')

const Connection = require(__dirname + '/../helper/database/connection/connection.helper.js')
const KnexConnection = require(__dirname + '/../helper/database/connection/adapter/knex.connection.helper.js')

const Orm = require(__dirname + '/../helper/database/orm/orm.helper.js')
const BookshelfOrm = require(__dirname + '/../helper/database/orm/adapter/bookshelf.orm.helper.js')

module.exports = (bottle) => {
	const connection = new Connection(bottle)
	
	bottle.factory('JoiValidation', (container) => {
		const joi = container.joi
		return new JoiValidation(joi)
	})
	bottle.factory('Validation', (container) => {
		const bottle = container.Bottle
		return new Validation(bottle)
	})
	bottle.factory('KnexConnection', (container) => {
		const knex = container.knex
		return new KnexConnection(knex)
	})
	bottle.factory('Connection', (container) => {
		return connection
	})
	bottle.factory('BookshelfOrm', (container) => {
		const bookshelf = container.bookshelf
		return new BookshelfOrm(bookshelf)
	})
	bottle.factory('Orm', (container) => {

		const connection = container.Connection
		// const connector = connection.create('mysql-dev')
		const connector = connection.create('sqlite-dev')

		const bottle = container.Bottle
		const orm = new Orm(bottle)	

		return orm.connect(connector)
	})
	bottle.service('Authentication', Authentication, 'Bottle')
	bottle.factory('JwtAuthentication', (container) => {
		const jwt = container.Jwt
		const pem = container.Pem
		const promise = container.Promise
		const fs = container.fs
		return promise.promisifyAll(new JwtAuthentication(jwt, pem, fs, promise))
	})

	return bottle
}