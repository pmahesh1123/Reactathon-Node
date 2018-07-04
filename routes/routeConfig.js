var express= require('express')
var router = express.Router()
var controller = require('../controllers/eventController')

router.get('/users', function(req, res, next){
	controller.getUserDetails(req,res,next)
})

router.get('/upcomingevents', function(req, res, next){
	controller.getUpcomingEvents(req,res,next)
})

router.get('/pastevents', function(req, res, next){
	controller.getPastEvents(req,res,next)
})

router.get('/groups', function(req, res, next){
	controller.getGroupDetails(req,res,next)
})

router.get('/group/:id', function(req, res, next){
	controller.getGroupByEventID(req,res,next)
})

router.post('/updateGroup', function(req, res, next){
	controller.updateGroupDetails(req,res,next)
})

router.post('/addEvent', function(req, res, next){
	controller.addEvent(req,res,next)
})

router.post('/addGroup', function(req, res, next){
	controller.addGroup(req,res,next)
})

module.exports = router;