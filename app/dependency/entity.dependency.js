'use strict'

const StreamEntityModel = require(__dirname + '/../model/stream/stream.entity.model.js')
const UserEntityModel = require(__dirname + '/../model/user/user.entity.model.js')
const FollowEntityModel = require(__dirname + '/../model/follow/follow.entity.model.js')
const CategoryFollowEntityModel = require(__dirname + '/../model/follow/category.follow.entity.model.js')
const ProfileEntityModel = require(__dirname + '/../model/profile/profile.entity.model.js')

module.exports = (bottle) => {

	bottle.service('StreamEntityModel', StreamEntityModel)

	bottle.service('UserEntityModel', UserEntityModel, 'Crypto')

	bottle.service('CategoryFollowEntityModel', CategoryFollowEntityModel)
	
	bottle.service('FollowEntityModel', FollowEntityModel)

	bottle.service('ProfileEntityModel', ProfileEntityModel, 'UUID', 'Moment')

	return bottle

} 