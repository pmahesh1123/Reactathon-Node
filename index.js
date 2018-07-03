global.rootdir = __dirname;
global.config = require('config')

var express = require('express')
var bodyParser = require('body-parser')
var app =express()
var routes = require(rootdir+'/routes/routeConfig');
var connect =require('connect')
var http = require('http')
var server = http.createServer(app)
const mongoUtil = require('./util/mongoUtil')

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));


/*app.use(function(req,res,next) {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
})*/
 // var app = connect().use(connect.static('public')).listen(8080, '0.0.0.0')
var router = app.use('/vzevents',routes);



mongoUtil.createConnection(function(err){
	if(err){
		console.log("Unable to start Mongo connection");
	}else {
		server.listen(config.app.port, function() {
			console.log("Application running on port: " + config.app.port);
		})
	}
})
app.get('/',  function(req,res,next) {
	console.log('Start');
	res.json({message : 'Node Service Started'})
})