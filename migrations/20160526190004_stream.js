
exports.up = function(knex, Promise) {
	return knex.schema.createTable('stream', (table) => {
		table.uuid('id').primary()
		table.string('username').references('user.username')
		table.string('content')
		table.integer('vote')
		table.string('stream_id').references('stream.id')
		table.dateTime('datecreated')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('stream')
};
