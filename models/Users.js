const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('@hapi/joi');

const UserSchema = new mongoose.Schema({
	firstname: {
    type: String,
    required: [true, 'Please enter first name'],
    trim: true,
    lowercase: true
  },
	
  firstname: {
    type: String,
    required: [true, 'Please enter first name'],
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    alias: 'surname',
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    //index: true, //Optional if unique is defined
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    uppercase: true,
    //minlength:10,
    //maxlength: 50,
    //Custom validation
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  password: {
	  type: String,
	  required: [true, "Password must be min 6 characters length and can contain only upper/lower alphabets, 0-9, #, $, &, _ "],
	  minlength:6,
	  validate: function(value) {
      var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;
      return passwordRegex.test(value);
    }
  },
	type: {
		type: String,
		
	}
  
});

const User = mongoose.model("User", UserSchema);
function validateUser(user) {
  const schema = Joi.object().keys({
    email: Joi.string()
      .min(8)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
      .max(20)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/) //special/number/capital
  });
  return Joi.validate(user, schema);
}
module.exports = User;
module.exports.validate = validateUser;