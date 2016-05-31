'use strict'
const Controller = require(__dirname + '/../super/controller.super.js')
const owner = 'ma4m'
class UserController extends Controller {
	constructor (model) {
		super()
		this.model = model
	}
	followUser (body, params, query, reply) {
		this.model
					.serviceFollowUser(owner, body.username)
					.then((data) => {
						let message = (data)? 'user followed': 'user fail followed' 
						return reply({
							'message': message,
							'data': (data)? true: false
						})
					})
					.error((err) => {
						console.log(err)
						return reply({
							error: 'InvalidParams',
							message: 'Cannot process your request'
						})
					})
	}
	getUser (body, params, query, reply) {
		this.model
					.serviceGetUser(params.username)
					.then((data) => {
						let message = (data)? 'user found': 'user not found' 
						return reply({
							'message': message,
							'data': data
						})
					})
					.error((err) => {
						console.log(err)
						return reply({
							error: 'InvalidParams',
							message: 'Cannot process your request'
						})
					})
	}
	createUser (body, params, query, reply) {
		this.model
					.serviceCreateUser(body.username, body.email, body.password)
					.then((data) => {
						let message = (data)? 'user created': 'user fail created'
						return reply({
							'message': message,
							'data': data
						})
					})
					.error((err) => {
						console.log(err)
						return reply({
							error: 'InvalidParams',
							message: 'Cannot process your request'
						})
					})
	}
}
module.exports = UserController