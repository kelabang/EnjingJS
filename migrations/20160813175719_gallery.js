
exports.up = function(knex, Promise) {
	return knex.schema.createTable('gallery', (table) => {
		table.uuid('id').primary()
		table.string('user_id').references('user.id')
		table.string('category_id').references('category.id')
		table.string('name')
		table.string('caption')
		table.string('server')
		table.text('meta')
		table.datetime('datecreated')
	})  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gallery')
};
