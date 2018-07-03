const util = require('../util/utils')
const userDetails = require('../mocks/userdetails.json')
const eventDetails = require('../mocks/eventdetails.json')
const groupDetails = require('../mocks/groupdetails.json')
const mongoUtil = require('../util/mongoUtil')

module.exports = {
	getUserDetails : function(req, res, next) {
		return util.sendJson(res, userDetails)
	},
	getEventDetails: function(req, res, next) {
		return util.sendJson(res, eventDetails)
	},
	getGroupDetails: function(req, res, next) {
		return util.sendJson(res, groupDetails)
	},
	checkConnection: function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")
		database.collection('groupdetails').find().toArray(function(err, result) {
			return util.sendJson(res, result)
		})
	},
	updateGroupDetails : function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")

		  let myquery = { result: "", group_rank: "" , group_score:""};
		  let newvalues = { $set: {event_id: "100", result: "won", group_rank: "1",, group_score:"78" } };
		  database.collection("groupdetails").updateOne(myquery, newvalues, function(err, res) {
		    if (err) throw err;
		  });
	},
	addEvent: function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")

		let newObj = {event_id:"",event_name:"",start_date:"",end_date:"",event_description:"",technologies:"",problem_statements:["Statement_1","Statement_2"],
							attachments:["att1.jpeg","att2.jpeg"],	event_type: "hackathon",	event_link: "",	judge:[] }

		database.collection("eventdetails").insertOne(newObj, function(err, res) {
		    if (err) throw err;
		});

	} 
	addGroup: function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")

		let newObj = {event_id:"",group_name:"",participants:[],group_score:"",group_rank:"",result:""}

		database.collection("groupdetails").insertOne(newObj, function(err, res) {
		    if (err) throw err;
		});

	} 
}