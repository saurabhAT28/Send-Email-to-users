const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const userSchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  companyName:{
    type: String,
    required: false,
  },
  designation:{
    type: String,
    required: false,
  },
  technologyWorkingOn:{
    type: String,
    required: false,
  },
  companyLocation:{
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  totalMailSent:{
    type: Number,
    default: 0
  }
});

const User = mongoose.model("user", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
};

module.exports = {
  User,
  validate,
};