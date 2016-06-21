'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class ProfileModel extends Model {
	constructor (profileEntity, profileMapper) {
		super()
		this.profileEntity = profileEntity
		this.profileMapper = profileMapper
		this._mapProfile = [
			[],
			[
				'firstname', 'lastname', 'birthday', 'location', 'description' // user profile
			]
		]
	}
	serviceCreateProfile (id, options, type) {
		console.log('-->> service create profile ')
		return new this.Promise((resolve, reject) => {
			let profile = this.profileEntity.create()
			profile.user_id = id
			profile.type = type
			this._generateProfile(type, profile, options) // fill profile object
			this.profileMapper.save(profile)
				.then((profile)=>{
					resolve({ 
						id: profile.get('user_id')
					})
				})
				.error((err)=>{
					reject(err)
				})
				.catch((err)=>{
					reject(err)
				})
		})
	}
	_generateProfile(type, output, input) {
		let map = this._mapProfile[type] 
		return map.map((i) => {
			console.log('-->> log ', i)
			output[i] = (input[i])? input[i]: ''
		})
		return output
	}
}
module.exports = ProfileModel


