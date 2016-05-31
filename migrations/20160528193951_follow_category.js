
exports.up = function(knex, Promise) {
	return 	knex.schema
						.createTable('follow_category', (table) => {
							table.uuid('id').primary()
							table.uuid('user_id').references('user.id')
							table.string('name')
							table.string('decscription')
							table.string('data')
						})
};

exports.down = function(knex, Promise) {
	return 	knex.schema
						.dropTable('follow_category')
};
