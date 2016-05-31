'use strict'
class BookshelfOrm {
	constructor (bookshelf) {
		this.bookshelf = bookshelf
	}
	extend (persistent) {
		return this.bookshelf.Model.extend(persistent)
	}
}

module.exports = BookshelfOrm