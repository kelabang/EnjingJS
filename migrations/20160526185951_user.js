
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user', (table) => {
		table.uuid('id').primary()
		table.string('username').unique()
		table.string('email').unique()
		table.string('password')
		table.dateTime('datecreated')
	})
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('user')
};
