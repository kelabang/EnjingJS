'use strict'
class Config {
	constructor(fs, promise) {
		console.log('-- create config --')
		this.target = __dirname + '/config'
		this.fs = fs
		this.promise = promise
		this.configuration = {}
	}
	setNeed(need) {
		this.need = need
		return this
	}
	readconfig(target, cb) {
		this.fs.readdirAsync(target).then((data)=>{
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
	readconfigJSON(filename, cb) {
		this.readconfigfile(filename, (err, data) => {
			cb(err, JSON.parse(data))
		})
	}
	setup(target, cb) {
		this.readconfigAsync(target)
		.then((data) => {
			console.log('-- read config done --')
			var current = this.target + '/'
			var que = []
			for (var i = 0, len = data.length; i < len; i++) {
				// var name = data[i].replace('.config.json', '')
				que.push(this.readconfigJSONAsync(current + data[i]))
				// this.configuration[name] = require(current + i)
			}
			this.promise
				.all(que)
				.then((result) => {
					for (var i = 0, len = result.length; i < len; i++) {
						var name = data[i].replace('.config.json', '')
						this.configuration[name] = result[i]
					}
					cb(null, this.configuration)
				})
		}).error((err) => {
			console.log('-- read config not done --')
			console.error(err)
			cb(err)
		})
	}
}

module.exports = Config