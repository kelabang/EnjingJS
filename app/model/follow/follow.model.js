'use strict'
const Model = require(__dirname + '/../../super/model.super.js')

const FOLLOW_TYPE_USER = 1
const FOLLOW_TYPE_STREAM = 2
const FOLLOW_TYPE_TRIP = 3

const CATEGORY_FOLLOW_DEFAULT_NAME = 'follow'

class FollowModel extends Model {
	constructor (followEntity, followCatEntity, followMapper) {
		super()
		this.followEntity = followEntity
		this.followCatEntity = followCatEntity
		this.followMapper = followMapper
	}
	serviceCreateDefaultCategory(userid) {
		return new this.Promise((resolve, reject) => {
			let followCatEntity = this.followCatEntity.create()
			followCatEntity.user_id = userid
			followCatEntity.name = 'follow'
			followCatEntity.description = 'default follow'
			this.followMapper 	
								.saveCategory(followCatEntity)
								.then((data) => {
									resolve(data)
								})
								.error((err) => {
									reject(err)
								})
		})
	}
	serviceFollowUser(ownerid, userid) {
		return new this.Promise((resolve, reject) => {
			let followCatEntity = this.followCatEntity.create()
			followCatEntity.user_id = ownerid
			followCatEntity.name = CATEGORY_FOLLOW_DEFAULT_NAME
			this.followMapper
							.findCategory(followCatEntity)
							.then((data) => {
								if(!data) return resolve(data)
								let followEntity = this.followEntity.create()
								followEntity.follow_category_id = data.get('id')
								followEntity.follow_id = userid
								followEntity.follow_type_id = FOLLOW_TYPE_USER
								return new this.Promise((_resolve, _reject) => {
									this.followMapper
													.findFollowUser(followEntity)
													.then((data) => {
														if(!data) return _resolve(followEntity)
														return resolve(followEntity)
													})
								})
							})
							.then((followEntity) => {
								return this .followMapper
											.saveFollowUser(followEntity)
							})
							.then((data) => {
								resolve(data)
							})
							.error((err) => {
								reject(err)
							})
		})
	}
}
module.exports = FollowModel