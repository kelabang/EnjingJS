'use strict'
const Core = require(__dirname + '/super/core.super.js')
class Route extends Core {
	constructor (fs, server, validation, di) {
		super()
		this.fs = fs
		this.server = server
		this.validation = validation
		this.di = di
		this.routes = []
	}
	readconfig(target, cb) {
		this.fs
				.readdirAsync(target)
				.then((data)=>{
					cb(null, data)
				}).error((err) => {
					cb(err)
				})
	}
	readconfigfile(filename, cb) {
		this.fs.readFileAsync(filename, 'utf8').then((data) => {
			cb(null, data)
		}).error((err) => {
			cb(err)
		})
	}
	fetch (cb) {
		const Promise = this.di.container.Promise
		const path = __dirname + '/' + this.config().directory
		this.readconfig(path, (err, data) => {
			let routeconf = {}
			let que = []
			data.map((i) => {
				que.push(this.readconfigfileAsync(path + '/' + i))
			})
			Promise.all(que).then((result) => {
				let x = 0
				data.map((i) => {
					let name = i.replace('.route.json', '')
					routeconf[name] = JSON.parse(result[x])
					x++
				})
				return cb(null, routeconf)
			}).error((err) => {
				console.error(err)
				cb(err)
			})
		})
	}
	firstToUpperCase( str ) {
	    return str.substr(0, 1).toUpperCase() + str.substr(1);
	}
	translate(name) {
		let n = name.replace('.js', '')
		n = n.split('.')
		n = n.map((v)=>{
			return this.firstToUpperCase(v)
		})
		n = n.join('')
		return n
	}
	curry(obj, start, method) {
		return (request, reply) => {
			obj[start](request, reply, method)
		}
	}
	prepare (data, cb) {
		let keys = Object.keys(data)
		let i = keys.length
		let _data = []
		while(i--) {
			let route = data[keys[i]]
			route.map((i) => {
				let _path = __dirname + '/controller/' + i.handler.path
				let depname = this.translate(i.handler.path)
				let handler = this.di.container[depname]
				let start = (i.handler.start)? i.handler.start: 'start'
				let toBind = {
					"method": i.method,
					"path": i.path,
					"handler": this.curry(handler, start, i.handler.method)
				}
				if(i.validation){
					if(!toBind['config']) toBind['config'] = {}
					toBind['config']['validate'] = this.validation.select('joi').translate(i.validation)
				}
				_data.push(toBind)
			})
		}
		cb(null, _data)
	}
	bind (cb) {
		return this
					.fetchAsync()
					.then((data) => {
						return this.prepareAsync(data)
					})
					.then((data) => {
						data.map((i) => {
							this.server.route(i)
						})
						cb(null, this.server)
					})
	}
}
module.exports = Route