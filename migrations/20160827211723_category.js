exports.up = function(knex, Promise) {
	return 	knex.schema
						.createTable('category', (table) => {
							table.uuid('id').primary()
							table.uuid('user_id').references('user.id')
							table.string('for')
							table.string('name')
							table.string('description')
							table.string('data')
							table.datetime('datecreated')
						})
};

exports.down = function(knex, Promise) {
	return 	knex.schema
						.dropTable('category')
};