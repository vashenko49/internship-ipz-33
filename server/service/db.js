const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.urlDataBase, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(process.env.urlDataBase);
  } catch (e) {
    process.exit(1);
  }
};


module.exports = connectDB;
