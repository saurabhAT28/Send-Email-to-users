const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  emailData: {
    type: JSON,
    required: true,
  },
});

const Email = mongoose.model("email", emailSchema);

module.exports = Email;