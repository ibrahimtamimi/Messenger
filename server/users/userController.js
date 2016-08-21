var User = require('./userModel.js');

module.exports = {
	
	signin: function(req, res, next){
		var username = req.body.username;
		var password = req.body.password;
		User.findOne({username: username})
      		.exec(function (error, user) {
       			if (!user) {
     		 	    res.status(500).send(new Error('User does not exist'));
    		    } else {
       			    User.comparePassword(password,user.password, res, function(found){
        		        if(!found){
       				       res.status(500).send('Wrong Password');
      			        } else {
     			            var token = jwt.encode(user, 'secret');
				            res.setHeader('x-access-token',token);
				            res.json({token: token, userId : user._id});
                        }
                    });
                }
            });
	},

	fbSignin : function (req , res ,next) {
		var fuserID = req.body.fb_ID;
		User.findOne({fb_ID : fuserID})
		.exec(function (error , user) {
			if(!user){
				res.json(false);
			}else{
				var token = jwt.encode(user, 'secret');
	            res.setHeader('x-access-token',token);
	            res.json({token: token, user:user});
			}
		}) 
	},

	signup: function(req, res, next){
		var username = req.body.username;
	    var password = req.body.password;
	    User.findOne({username: username})
	 		.exec(function (error, user) {
		 		if(user){
		 			next(new Error('User already exist!'));
		 		}else{
	 				var newUser = new User ({
						username: username,
				        password: password,
				        firstName:req.body.firstName,
				        lastName:req.body.lastName,
				        city:req.body.city,
				        country:req.body.country,
				        rate:req.body.rate,
				        interests:req.body.interests,
				        picture:req.body.picture,
				        game:req.body.game,
				        email : req.body.email,
				        fb_ID:req.body.fb_ID
					})
			 		newUser.save(function(err, newUser){
			            if(err){
			                res.status(500).send(err);
			            } else {
			              res.status(200).send(newUser);
			            };
			        });
		 		}
	 		})
	 
	},
	
	getUser: function(req, res, next){
		User.findOne({_id: req.params.id}, function(err, user){
			if(err) {
				res.status(500).send(err)
			}
			res.json(user)
		})
	},

	editUser: function(req, res, next){
		User.findOne({_id: req.params.id}, function(err, user){
      if(err){
        res.status(500).send(err);
      } else if (!user){
        res.status(500).send(new Error ('User does not exist'));
      } else {

        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastname || user.lastName;
        user.email = req.body.email || user.email;
        user.country = req.body.country || user.country;
        user.city = req.body.city || user.city;
        user.interests = req.body.interests || user.interests;

        user.save(function(err, savedUser){
          if(err){
            res.status(500).send(error);
          } else {
            res.json(savedUser);
          }
        });
      }
    })
		
	},


	
}
