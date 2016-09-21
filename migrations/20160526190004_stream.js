
exports.up = function(knex, Promise) {
	return knex.schema.createTable('stream', (table) => {
		table.uuid('id').primary()
		table.string('user_id').references('user.id')
		table.string('content')
		table.uuid('gallery_id').references('gallery.id')
		table.integer('vote')
		table.integer('type')
		table.dateTime('datecreated')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('stream')
};
