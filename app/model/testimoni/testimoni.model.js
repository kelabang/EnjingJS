/*
* @Author: Imam
* @Date:   2016-08-21 18:34:11
* @Last Modified by:   Imam
* @Last Modified time: 2016-08-28 11:53:35
*/

'use strict';

'use strict'
const Model = require(__dirname + '/../../super/model.super.js')
class TestimoniModel extends Model {
	constructor (streamModel) {
		super()
		this.streamModel = streamModel
	}
	serviceGetTestimoni () {
		console.log(':: serviceGetTestimoni')
		return this.streamModel.serviceGetTypeTestimoni()
	}
	serviceCreateTestimoni(userid, content, images) {
		console.log(':: serviceCreateTestimoni')
		console.log(arguments)
		images = (images)? images: []
		return this.streamModel.serviceCreateTestimoni(userid, content, images)
	}
}
module.exports = TestimoniModel