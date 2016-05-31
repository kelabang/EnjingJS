'use strict'
class JoiValidation {
	constructor(joi) {
		this.joi = joi
	}
	translate (validation) {
		// console.log('translate -->>', validation)
		var output = {}
		for (var i in validation) { // i type of request
			// console.log('i translate -->> ', validation[i])
			var out = {}
			for (var x in validation[i]) { // x name of request
				var buff = this.joi
				// console.log('x from -->> ', validation[i])
				// console.log('x translate -->> ', validation[i][x])
				var varray = validation[i][x].split('|')
				// console.log('split result -->> ', varray)
				varray.map((z) => {
					// console.log('split modification -->> ', i)
					if(z.indexOf('@') > -1){ // check if string exist
						var y = z.split('@')
						// console.log((typeof buff[y[0]] == 'function'))
						// console.log(y[1])
						if(typeof buff[y[0]] == 'function'){
							// console.log('-->> limit min and max')
							if(y[0] == 'regex'){
								buff = buff[y[0]](new RegExp(y[1]))
							} else {
								buff = buff[y[0]](parseInt(y[1]))
							}
						}
						return z
					}
					if(typeof this.joi[z] == 'function') buff = buff[z]()
					return z
				})
				out[x] = buff
			}
			output[i] = out
		}
		return output
	}
}
module.exports = JoiValidation