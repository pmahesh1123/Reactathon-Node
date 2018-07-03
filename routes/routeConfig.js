var express= require('express')
var router = express.Router()
var controller = require('../controllers/eventController')

router.get('/users', function(req, res, next){
	controller.getUserDetails(req,res,next)
})

router.get('/events', function(req, res, next){
	controller.getEventDetails(req,res,next)
})

router.get('/groups', function(req, res, next){
	controller.getGroupDetails(req,res,next)
})

router.get('/checkConn', function(req, res, next){
	controller.checkConnection(req,res,next)
})

router.get('/updateGroup', function(req, res, next){
	controller.updateGroupDetails(req,res,next)
})

router.get('/addEvent', function(req, res, next){
	controller.addEvent(req,res,next)
})

router.get('/addGroup', function(req, res, next){
	controller.addGroup(req,res,next)
})

module.exports = router;