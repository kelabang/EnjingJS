
exports.up = function(knex, Promise) {
	return knex.schema.createTable('follow_type', (table) => {
							table.integer('id').primary()
							table.string('name')
						})
};

exports.down = function(knex, Promise) {
  	return knex.schema
  						.dropTable('follow_type')
};
