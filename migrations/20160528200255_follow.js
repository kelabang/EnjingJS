exports.up = function(knex, Promise) {
	return knex.schema.createTable('follow', (table) => {
		table.uuid('follow_category_id').references('follow_category.id')
		table.uuid('follow_id').references('user.id')
		table.integer('follow_type_id')
		table.datetime('datecreated')
	})
};

exports.down = function(knex, Promise) {
  	return knex.schema
  						.dropTable('follow')

};