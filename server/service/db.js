const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.urlDataBase, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (e) {
    process.exit(1);
  }
};


module.exports = connectDB;
