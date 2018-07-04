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

		  let myquery = { result: "", group_rank: "" , group_score:""};
		  let newvalues = { $set: {group_name: "100", result: "won", group_rank: "1", group_score:"78" } };
		  database.collection("groupdetails").updateOne(myquery, newvalues, function(err, res) {
		    if (err) throw err;
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