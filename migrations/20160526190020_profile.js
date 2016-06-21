
exports.up = function(knex, Promise) {
	return knex.schema.createTable('profile', (table) => {
		table.uuid('id').primary()
		table.string('user_id').references('user.id')
		table.string('firstname')
		table.string('lastname')
		table.date('birthday')
		table.string('location')
		table.text('description')
		table.integer('type')
		table.dateTime('datecreated')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('profile')
};
