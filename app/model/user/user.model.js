'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class UserModel extends Model {
	constructor (userEntity, userMapper, followModel) {
		super()
		this.userEntity = userEntity
		this.userMapper = userMapper
		this.followModel = followModel
	}
	serviceFollowUser(ownername, username) {
		return new this.Promise((resolve, reject) => {
			let join = this.Promise.join
			return join(
				this.serviceGetUser(ownername),
				this.serviceGetUser(username),
				(owner, user) => {
					if(!owner || !user) return resolve(null)
					return this.followModel.serviceFollowUser(owner.id, user.id)
				}
			).then((data) => {
				console.log('service follow user done >> ', data)
				return resolve(data)
			}).error((err) => {
				return reject(err)
			}).catch((err) => {
				return reject(err)
			})
		})
	}
	serviceGetUser(username) {
		let user = this.userEntity.create()
		user.username = username		
		return new this.Promise((resolve, reject) => {
			return this .userMapper
						.find(user)
						.then((data) => {
							if(!data) return resolve(data)
							resolve({
								id: data.get('id'),
								username: data.get('username'),
								email: data.get('email')
							})
						})
						.error((err) => {
							reject(err)
						})
						.catch((err) => {
							reject(err)
						})
		})												
	}

	serviceCreateUser(username, email, password) {
		let user = this.userEntity.create()
		user.username = username
		user.email = email
		user.password = password
		return new this.Promise((resolve, reject) => {
			this.userMapper
				.save(user)
				.then((data) => {
					return this .followModel
								.serviceCreateDefaultCategory(data.get('id'))
				})
				.then((data) => {
					resolve({
						id: data.get('user_id'),
						username: username,
						email: email
					})
				})
				.error((err) => {
					reject(err)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
}
module.exports = UserModel


