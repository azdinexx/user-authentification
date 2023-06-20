const User = require('./src/Models/User');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./src/Config/db');
db();
name = 'Admin';
username = 'admin';
email = 'admin@example.com';
password = 'admin';
role = ['admin'];

createAdmin = async () => {
  try {
    const user = new User({
      name,
      username,
      email,
      password,
      role,
    });

    await user.save();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
createAdmin();
