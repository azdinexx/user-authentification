const User = require('../Models/User');

const createAdmin = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  // handle fields not filled
  if (name || username || email || password || role) {
    return res.status(400).json({ msg: 'Please fill all fields' });
  }

  try {
    const user = new User({
      name,
      username,
      email,
      password,
      role,
    });

    // save user
    await user.save();

    res.status(201).json({ msg: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
module.exports = { createAdmin };
