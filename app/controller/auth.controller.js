'use strict'

const Controller = require(__dirname + '/../super/controller.super.js')

class AuthController extends Controller {
	constructor (config, model) {
		super(config)
		this.model = model
	}
	postRefresh(body, params, query, reply) {
		console.log('-->> refresh in auth controller')
		let message = ''
		let output = []
		return this.model.serviceRefresh(this._access_user.username)
			.then((access) => {
				console.log('-->> service login success')
				message = (access)? 'success refresh': 'fail refresh'
				output = access
				console.log(access)
				return reply({
					'message': message,
					'data': output
				})
			})
			.catch((err) => {
				console.log('-->> service login catch', err)
				message = 'refresh error'
				return reply({
					'message': message,
					'output': output
				})
			})
	}
	postLogin (body, params, query, reply) {
		console.log('-->> login in auth controller')
		let message = ''
		let output = []
		return this.model.serviceLogin(body.username, body.password)
			.then((access) => {
				console.log('-->> service login success')
				message = (access)? 'success login': 'fail login'
				output = access
				console.log(access)
				return reply({
					'message': message,
					'data': output
				})
			})
			.catch((err) => {
				console.log('-->> service login catch', err)
				message = 'login error'
				return reply({
					'message': message,
					'output': output
				})
			})
	}
	postLoginTwitter (body, params, query, reply) {
		console.log('-->> login twitter in auth controller')
		let message = ''
		let output = ''
		reply({
			'message': message,
			'data': output
		})
	}
	postRegister (body, params, query, reply) {
		console.log('-->> register in auth controller')
		let message = ''
		let output = []
		console.log('>> body ', typeof body)
		return this.model.serviceRegister(body.username, body.email, body.password, body.name)
			.then((user) => {
				console.log('-->> service register success')
				message = (user)? 'register success': 'register fail' 
				output = user
				return reply({
					'message': message,
					'data': output
				})
			})
			.error((err) => {
				console.log('-->> service register error')
				console.error(err)
				message = 'register error'
				return reply({
					'message': message, 
					'data': output
				})
			})
			.catch((err) => {
				console.log('-->> service register catch')
				message = 'register error'
				return reply({
					'message': message,
					'data': output
				})
			})
	}
}

module.exports = AuthController