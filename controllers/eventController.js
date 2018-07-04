const util = require('../util/utils')
const userDetails = require('../mocks/userdetails.json')
const eventDetails = require('../mocks/eventdetails.json')
const groupDetails = require('../mocks/groupdetails.json')
const mongoUtil = require('../util/mongoUtil')
var moment = require('moment')
let currentDate = moment().format('MM-DD-YYYY');
module.exports = {
	getUserDetails : function(req, res, next) {
		return util.sendJson(res, userDetails)
	},
	getUpcomingEvents: function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")
		database.collection('eventdetails').find({start_date:{$gte:currentDate}}).toArray(function(err, result) {
			return util.sendJson(res, result)
		})
		
	},
	getPastEvents: function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")
		console.log(currentDate);
		database.collection('eventdetails').find({start_date:{$lt:currentDate}}).toArray(function(err, result) {
			return util.sendJson(res, result)
		})
		
	},
	getGroupDetails: function(req, res, next) {
		return util.sendJson(res, groupDetails)
	},
	getGroupByEventID: function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")
		if(req.params.id){
			database.collection('groupdetails').find({event_id:req.params.id}).toArray(function(err, result) {
				return util.sendJson(res, result)
			})
		}
	},
	updateGroupDetails : function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")
			console.log(req.body);
		  let myquery = { result: "", group_score:""};
		  let newvalues = { $set: {group_name: req.body["group_name"], result: req.body["end_result"], group_score:req.body.score } };
		  database.collection("groupdetails").updateOne(myquery, newvalues, function(err, result) {
		    if (err) res.send({type:'error', message:err});
		    res.send({type:'Success',message:'Group updated successfully with scores'})
		  });
	},
	addEvent: function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")

		let newObj = {event_id:"",event_name:"",start_date:"",end_date:"",event_description:"",technologies:"",problem_statements:["Statement_1","Statement_2"],
							attachments:["att1.jpeg","att2.jpeg"],	event_type: "hackathon",	event_link: "",	judge:[] }

		database.collection("eventdetails").insertOne(newObj, function(err, data) {
		    if (err) throw err;
		    res.send({type:'Success',message:'Event added successfully'})
		});

	}, 
	addGroup: function(req, res, next) {
		let database = mongoUtil.getConnection().db("VZHackathon")
		
		let newObj = {event_id:req.body["event_id"],group_name:req.body["group_name"],participants:req.body.participants,group_score:"",group_rank:"",result:""}
		database.collection("groupdetails").find({'group_name':req.body["group_name"]}).toArray(function(err, result){
			if(result.length == 0){
				database.collection("groupdetails").insertOne(newObj, function(err, data) {
				    if (err) throw err;
				    res.send({type:'Success',message:'Enrolled successfully'})
				});
			}else{
				res.send({type:'error', message:'Group Name Already Exists'})
			}
		})

	} 
}