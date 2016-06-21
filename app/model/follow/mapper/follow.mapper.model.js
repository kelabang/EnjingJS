'use strict'
const Mapper = require(__dirname + '/../../../super/mapper.super.js')

class FollowMapperModel extends Mapper {
	constructor (db) {
		super()
		let mapperFolloWCategory = db.extendModel({
			tableName: 'follow_category'
		})
		this.mapperCategory = mapperFolloWCategory
		this.mapper = db.extendModel({
			tableName: 'follow', 
			category: () => {
				return this.hasOne(mapperFolloWCategory)
			}
		})
	}
	findCategory(followCategory) {
		return (new this.mapperCategory({
			user_id: followCategory.user_id,
			name: followCategory.name
		})).fetch()
	}
	findFollowUser(follow) {
		return (new this.mapper({
			follow_category_id: follow.follow_category_id,
			follow_id: follow.follow_id,
			follow_type_id: follow.follow_type_id
		})).fetch()
	}
	saveCategory(followCategory) {
		return (new this.mapperCategory({
			id: this.uuid.v4(),
			user_id: followCategory.user_id,
			name: followCategory.name,
			description: followCategory.description
		})).save(null, {method: 'insert'})
	}
	saveFollowUser(follow) {
		console.log('-->> user follow user')
		return (new this.mapper({
			follow_category_id: follow.follow_category_id,
			follow_id: follow.follow_id,
			follow_type_id: follow.follow_type_id,
			datecreated: this.moment.utc().format('YYYY-MM-DD HH:mm:ss')
		})).save(null, {method: 'insert'})
	}
	findUserWithUser(owner, user) {}
	findUserWithTrip(owner, trip) {}
}
module.exports = FollowMapperModel