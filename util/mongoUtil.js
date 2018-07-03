var MongoClient = require('mongodb').MongoClient
const mongoUrl = 'mongodb://localhost:27017/VZHackathon'

var state = {
	db: null
}

module.exports = {

	createConnection : function (callback) {
		MongoClient.connect(mongoUrl, function(err, db) {
			state.db = db
			return callback(err)
		})
	},

	getConnection : function() {
		return state.db;
	}
}