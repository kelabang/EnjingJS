'use strict'
const Controller = require(__dirname + '/../super/controller.super.js')
const owner = 'ma4m'
class UserController extends Controller {
	constructor (config, model) {
		super(config)
		this.model = model
	}
	followUser (body, params, query, reply) {
		let message = ''
		let output = []
		this.model
					.serviceFollowUser(owner, body.username)
					.then((data) => {
						message = (data)? 'user followed': 'user fail followed' 
						return reply({
							'message': message,
							'data': (data)? true: false
						})
					})
					.error((err) => {
						console.log(err)
						return reply(this._badRequest())
					})
	}
	getUser (body, params, query, reply) {
		let message = ''
		let output = []
		this.model
					.serviceGetUser(params.username)
					.then((data) => {
						message = (data)? 'user found': 'user not found' 
						output = data
						return reply({
							'message': message,
							'data': output
						})
					})
					.error((err) => {
						console.log(err)
						return reply(this._badRequest())
					})
	}
	createUser (body, params, query, reply) {
		let message = ''
		let output = []
		this.model
					.serviceCreateUser(body.username, body.email, body.password)
					.then((data) => {
						console.log('-->> service create user done ')
						console.log('-->> return data ', data)
						message = (data)? 'user created': 'user fail created'
						output = data
						return this.model  
										.serviceSignedUser(data.id, body.username, body.email)
					})
					.then((_data) => {
						console.log('-->> service sign user done controller')
						console.log(_data)
						return reply({
							'message': message,
							'data': output
						})
					})
					.error((err) => {
						console.log(err)
						return reply(this._badRequest())
					})
	}
}
module.exports = UserController