var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../client'));	
	app.use(function(req,res,next){
        var _send = res.send;
        var sent = false;
        res.send = function(data){
            if(sent) return;
            _send.bind(res)(data);
            sent = true;
        };
        next();
    });
};