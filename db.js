const mongoose = require("mongoose");

module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
    //   useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to database.");
  } catch (error) {
    console.log(error, "Could not connect to database.");
  }
};