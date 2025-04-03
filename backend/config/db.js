const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect("mongodb+srv://admin:admin@codeeditor.qrlcx.mongodb.net/?retryWrites=true&w=majority&appName=CodeEditor", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB;