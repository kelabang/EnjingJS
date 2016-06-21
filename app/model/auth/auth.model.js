'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class AuthModel extends Model {
	constructor (userModel, profileModel, authHelper) {
		super()
		this.userModel = userModel
		this.profileModel = profileModel
		this.authHelper = authHelper
	}
	serviceLogin (username, password) {
		console.log('-->> service login in auth model')
		let output = {}
		return new this.Promise((resolve, reject) => {
			this.userModel.serviceValidUser(username)
				.then((user) => {
					console.log('-->> service login ', user)
					let _pass = this.authHelper.generatePassword(password)
					console.log(_pass)
					if(!user) return []
					if(this.authHelper.generatePassword(password) !== user.password){
						return []
					}
					return this.userModel.serviceGetUser(user.username)
				})
				.then((user) => {
					console.log('-->> serivce get user ')
					const authenticator = this.authHelper.create('jwt')
					output['user'] = user
					return authenticator.generateUserCredential(user)
				})
				.then((token) => {
					console.log('-->> generate credentials ', token)
					output['access_token'] = token
					return resolve(output)
				})
				.catch((error) => {
					return reject(error)
				})
		})
	}
	serviceLoginTwitter (tw_user_id, tw_oauth_token, tw_oauth_private) {
		console.log('-->> service login twitter in auth model', tw_user_id)
		console.log('-->> service login twitter in auth model', tw_oauth_token)
		console.log('-->> service login twitter in auth model', tw_oauth_private)
	}
	serviceRegister (username, email, password, name) {
		console.log('-->> service register in auth model')
		let output = []
		let type = 1 // 1 for user, 2 for trip
		let options = {}
		let user = {}
		return new this.Promise((resolve, reject) => {
			this.userModel.serviceCreateUser(username, email, password)
				.then((_user) => {
					console.log('-->> service create user done ', _user)
					if(!_user) return []
					user = _user
					return this.userModel.serviceSignedUser(user.id, user.username, user.email)
				})
				.then((key) => {
					console.log('-->> service signed user done ', key)
					name = name.split(" ")
					let firstname = name[0]
					let lastname = name[1]
					options['firstname'] = firstname
					options['lastname'] = lastname
					return this.profileModel.serviceCreateProfile(user.id, options, type)
				})
				.then((profile) => {
					console.log('--> service create profile done')
					resolve(profile)
				}) 
				.error((err) => {
					console.error(err)
					reject(err)
				})
				.catch(function(error) {
				    console.log('Caught!', error);
				    reject(error)
				});
		})
	}
}
module.exports = AuthModel


