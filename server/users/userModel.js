var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name :{
    type :String
  },
  password :{
    type : String
  }

});


var User = mongoose.model('User', UserSchema);
module.exports = User;