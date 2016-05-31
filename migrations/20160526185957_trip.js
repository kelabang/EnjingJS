
exports.up = function(knex, Promise) {
	return knex.schema.createTable('trip', (table) => {
		table.uuid('id').primary()
		table.string('username').references('user.username')
		table.string('name')
		table.string('description')
		table.dateTime('datecreated')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('trip')
};
