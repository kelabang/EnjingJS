/*
* @Author: Imam
* @Date:   2016-08-21 18:34:11
* @Last Modified by:   Imam
* @Last Modified time: 2016-11-02 22:31:12
*/

'use strict';

'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class TestimoniModel extends Model {
	constructor (streamModel) {
		super()
		this.streamModel = streamModel
	}
	serviceGetTestimoniEnable() {
		console.log(':: serviceGetTestimoniEnable')
		return this.streamModel.serviceGetTypeTestimoniEnable()
	}
	serviceGetTestimoni () {
		console.log(':: serviceGetTestimoni')
		return this.streamModel.serviceGetTypeTestimoni()
	}
	serviceGetAllTestimoni () {
		console.log(':: serivceGetAllTestimoni')
		return this.streamModel.serviceGetTypeAllTestimoni()
	}
	serviceCreateTestimoni(userid, content, images) {
		console.log(':: serviceCreateTestimoni')
		console.log(arguments)
		images = (images)? images: []
		return this.streamModel.serviceCreateTestimoni(userid, content, images)
	}
	serviceEnableTestimoni (id) {
		console.log(':: serviceEnableTestimoni')
		console.log('value of id ', id)
		return this.streamModel.serviceEnableTypeTestimoni(id)
	}
	serviceDisableTestimoni (id) {
		console.log(':: serviceEnableTestimoni')
		console.log('value of id ', id)
		return this.streamModel.serviceDisableTypeTestimoni(id)
	}
}
module.exports = TestimoniModel