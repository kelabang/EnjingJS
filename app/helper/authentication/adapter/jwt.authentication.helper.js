'use strict'
class JwtAuthentication {
	constructor(jwt, pem, fs, promise) {
		this.jwt = jwt
		this.pem = pem
		this.fs = fs
		this.Promise = promise
	}
	verify(token, path, cb) {
		this.fs.readFile(path, 'utf8', (err, cert) => {
			if(err) return cb(err)
			return this.jwt.verify(token, cert, cb)
		})	
	}
	decode(token, cb) {
		return this.jwt.decode(token, {'complete': true})
	}
	createPrivateKey (data, cb) {
		console.log('-->> private key :: ', data.privateKey)	
		this.pem.createPrivateKey(data.size, {'chiper': data.chiper}, (err, keys) => {
			
			if(err) return cb(err)

			let cert = keys.key
			let cert_pub = null

			this.createPublicKeyAsync(cert)
				.then((keys_pub) => {

					cert_pub = keys_pub.publicKey
					
					let que = [];
					que.push(this.manifestFileAsync(data.path.private, cert)) // store key to file
					que.push(this.manifestFileAsync(data.path.public, cert_pub)) // stocre key to file

					return this.Promise.all(que)
												.then((data) => {
													cb(null, cert)
												})
												.error((err) => {
													return cb(err)
												})
				})
				.error((err) => {
					return cb(err)
				})
		})
		// this.pem.createCertificate({days:1, selfSigned:true}, (err, keys) => {
		// 	console.log('-->> keys create cert ', keys)
			
		// 	if(err){
		// 		return err
		// 	}

		// 	let cert = keys['clientKey']
		// 	let cert_pub = null;

		// 	this.createPublicKeyAsync(cert)
		// 		.then((keys_pub) => {

		// 			cert_pub = keys_pub.publicKey
					
		// 			let que = [];
		// 			que.push(this.manifestFileAsync(data.path.private, cert))
		// 			que.push(this.manifestFileAsync(data.path.public, cert_pub))

		// 			return this.Promise.all(que)
		// 										.then((data) => {
		// 											cb(null, cert)
		// 										})
		// 										.error((err) => {
		// 											return cb(err)
		// 										})

		// 		})
		// 		.error((err) => {
		// 			return cb(err)
		// 		})
		// })
	}
	getPublicKey(path_pub, cb) {
		this.read('path_pub', cb)
	}
	createPublicKey (cert, cb) {
		return this.pem.getPublicKey(cert, cb)
	}
	manifestFile (path, content, cb) {
		return this.fs.writeFile(path, content, cb)
	}
	generate(payload, path, cb) {
		let algorithm = {
			'algorithm': 'RS256'
		}
		this.fs.readFile(path, 'utf8', (err, cert) => {
			if(err) cb(err)
			return this.jwt.sign(payload, cert, algorithm, cb)
		})
	}
	generateToken (user, cert, path_pub, cb) {
		console.log('-->> generate token method')
		let algorithm = {
			'algorithm': 'RS256'
		}
		let payload = {
			'use': user.username,
			'ema': user.email,
			'id': user.id
		}

		console.log('-->> check if method exists :: ', typeof this.jwt.sign == 'function')
		console.log('-->> payload to regenerate ', payload)
		
		this.jwt.sign(payload, cert, algorithm, (err, token) => {
			
			cb(err, token)
		
		})
	}
	sign (payload, _private, _public, cb) {
		console.log('-->> jwt authentication')
		const filename = _private + '/' + payload.id + '_adr.piv'
		const filename_pub = _public + '/' + payload.id + '_adr.pub'
		let config = {
			"size": 1024 , // in bit rsa key
			"chiper": 'el psy congroo',
			"path": {
				"private": filename,
				"public": filename_pub
			}
		}
		this.createPrivateKeyAsync(config)
			// .then((cert) => {
			// 	return this.generateTokenAsync(payload, cert, filename_pub)
			// })
			.then((data) => {
				return cb (null, data) 
			})
			.error((err) => {
				return cb (err)
			})
	}
	read (path, cb) {
		this.fs.readfile(path, 'utf8', (err, data) => {
			cb(err, data)
		})
	}
}
module.exports = JwtAuthentication