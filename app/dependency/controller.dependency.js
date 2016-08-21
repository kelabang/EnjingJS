'use strict'
const UserController = require(__dirname + '/../controller/user.controller.js')
const StreamController = require(__dirname + '/../controller/stream.controller.js')
const AuthController = require(__dirname + '/../controller/auth.controller.js')
const GalleryController = require(__dirname + '/../controller/gallery.controller.js')
module.exports = (bottle) => {

	bottle.factory('ControllerConfig', (container) => {
		const authenticator = container.Authentication.create('jwt')
		return {
			'authentication': authenticator,
			'descriptor': container.Boom
		}
	})

	bottle.service('AuthController', AuthController, 'ControllerConfig', 'AuthModel')
	
	bottle.service('UserController', UserController, 'ControllerConfig', 'UserModel')

	bottle.service('StreamController', StreamController, 'ControllerConfig', 'StreamModel')

	bottle.service('GalleryController', GalleryController, 'ControllerConfig', 'GalleryModel')

	return bottle

}