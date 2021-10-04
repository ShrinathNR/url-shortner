const mogoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mogoose.connect(db, { useNewUrlParser: true });
    console.log("mongo connected...");
  } catch (err) {
    console.err(err);
    process.exit(1);
  }
};

module.exports = connectDB;
