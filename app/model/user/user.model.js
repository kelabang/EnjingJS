'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class UserModel extends Model {
	constructor (userEntity, userMapper, followModel, Authentication) {
		super()
		this.userEntity = userEntity
		this.userMapper = userMapper
		this.followModel = followModel
		this.authenticator = Authentication.create('jwt')
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
	serviceValidUser(username) {
		let user = this.userEntity.create()
		user.username = username
		return new this.Promise((resolve, reject) => {
			return this	.userMapper
						.find(user)
						.then((data) => {
							if(!data) return resolve(data)
							resolve({
								id: data.get('id'),
								username: data.get('username'),
								password: data.get('password')
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
	serviceGetUser(username) {
		let user = this.userEntity.create()
		user.username = username
		return new this.Promise((resolve, reject) => {
			return this .userMapper
						.findWithProfile(user)
						.then((user) => {
							if(!user) return resolve(user)
							// console.log(JSON.stringify(user.related('profile')))
							resolve({
								id: user.get('id'),
								username: user.get('username'),
								email: user.get('email'),
								firstname: user.related('profile').get('firstname'),
								lastname: user.related('profile').get('lastname')
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
	serviceSignedUser(id, username, email) {
		console.log('-->> service signed user')
		let user = this.userEntity.create()
		user.id = id
		user.username = username
		user.email = email
		return new this.Promise((resolve, reject) => {
			return this	.userMapper
						.find(user)
						.then((data) => {
							if(!data) return resolve(data)
							return this.authenticator.sign(user)
						})
						.then((token) => {
							console.log('-->> after sign :: ', token)
							resolve(token)
						})
						.error((err) => {
							reject(err)
						})
						.catch((err) => {
							reject(err)
						})
		})
		// return this.authenticator.sign(user)
		// .then((data) => {
		// 	console.log('-->> user model')
		// 	console.log(data)
		// })
		// .catch((err) => {
		// 	console.log('-->> user model')
		// 	console.error(err)
		// })
	}
	serviceCreateUser(username, email, password) {
		console.log('-->> execute service create user')
		console.log('-->> arguments that passed ', arguments)
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
					return resolve({
						id: data.get('user_id'),
						username: username,
						email: email
					})
				})
				.error((err) => {
					return reject(err)
				})
				.catch((err) => {
					return reject(err)
				})
		})
	}
}
module.exports = UserModel


