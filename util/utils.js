const delay = require('lodash.delay')

var useDelay = false
process.argv.forEach(function(val, index,array) {
	if(val === 'delay') useDelay= true
})

module.exports= {

	sendJson : function(res, data) {
		// res.setHeader('Content-Type','application/json')
		if(useDelay){
			delay(() => res.send(JSON.stringify(data)), Math.random()*300)
		}
		else {
			res.send(JSON.stringify(data))
		}
		return res
	}
}