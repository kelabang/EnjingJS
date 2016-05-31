'use strict'
const UserController = require(__dirname + '/../controller/user.controller.js')
const StreamController = require(__dirname + '/../controller/stream.controller.js')
module.exports = (bottle) => {

	bottle.service('UserController', UserController, 'UserModel')

	bottle.service('StreamController', StreamController, 'StreamModel')

	return bottle

}