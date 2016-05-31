'use strict'
class KnexConnection {
	constructor (knex) {
		this.knex = knex
	}
	connect (config) {
		this.knex = this.knex(config)
		return this.knex
	}
}
module.exports = KnexConnection