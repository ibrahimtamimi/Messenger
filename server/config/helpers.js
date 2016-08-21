// including (JSON Web Token) to encode and decode module
var jwt = require('jwt-simple');

module.exports = {
	errorLogger: function(error, req, res, next){
		// log the error then send it to the next middleware
		console.log(error.stack);
		next(error);
	},

	errorHandler: function(error, req, res, next){
		// send error message to client
		// message for error handling on app
		res.send(500, {error: error.message});
	},

	decode: function(req, res, next){
		var token = req.headers['x-access-token'];
		var user;

		if(!token){ // send forbidden if a token is not provided
			return res.send(403);
		}

		try{
			// decode token and attach user to the request
			// for user inside our controllers
			user = jwt.decode(token, 'secret');
			req.user = user;
			next();
		} catch(error) {
			return next(error);
		}
	}
};
