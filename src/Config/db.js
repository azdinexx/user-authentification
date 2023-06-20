const mongoose = require('mongoose');

const DB_URL = process.env.MONGO;

const db = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
