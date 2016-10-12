var express = require('express');
var server = require ('http').createServer(app);
var app = express();
var port = process.env.PORT || 3333;

require('./config/middleware.js') (app,express);
require('./config/routes.js') (app,express);

app.listen(port , function () {
	console.log('Messenger Server now listening on port ' + port);
	console.log('localhost:'+port);
});

module.exports = app;