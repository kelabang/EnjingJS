
exports.up = function(knex, Promise) {
	return knex.schema.createTable('profile', (table) => {
		table.uuid('id').primary()
		table.string('username').references('user.username')
		table.string('firstname')
		table.string('lastname')
		table.date('birthday')
		table.string('location')
		table.dateTime('datecreated')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('profile')
};
