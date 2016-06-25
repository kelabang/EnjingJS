'use strict'

const StreamModel = require(__dirname + '/../model/stream/stream.model.js')
const StreamMapperModel = require(__dirname + '/../model/stream/mapper/stream.mapper.model.js')

const AuthModel = require(__dirname + '/../model/auth/auth.model.js')

const UserModel = require(__dirname + '/../model/user/user.model.js')
const UserMapperModel = require(__dirname + '/../model/user/mapper/user.mapper.model.js')

const ProfileModel = require(__dirname + '/../model/profile/profile.model.js')
const ProfileMapperModel = require(__dirname + '/../model/profile/mapper/profile.mapper.model.js')

const FollowModel = require(__dirname + '/../model/follow/follow.model.js')
const FollowMapper = require(__dirname + '/../model/follow/mapper/follow.mapper.model.js')

module.exports = (bottle) => {

	bottle.service('StreamMapperModel', StreamMapperModel, 'Orm', 'UserMapperModel')
	bottle.service('StreamModel', StreamModel, 'StreamEntityModel', 'StreamMapperModel')

	bottle.service('FollowMapper', FollowMapper, 'Orm')
	bottle.service('FollowModel', FollowModel, 'FollowEntityModel', 'CategoryFollowEntityModel', 'FollowMapper')

	bottle.service('UserMapperModel', UserMapperModel, 'Orm', 'ProfileMapperModel')
	bottle.service('UserModel', UserModel, 'UserEntityModel', 'UserMapperModel', 'FollowModel', 'StreamModel', 'Authentication')

	bottle.service('AuthModel', AuthModel, 'UserModel', 'ProfileModel', 'Authentication')

	bottle.service('ProfileMapperModel', ProfileMapperModel, 'Orm')
	bottle.service('ProfileModel', ProfileModel, 'ProfileEntityModel', 'ProfileMapperModel')

	return bottle

} 