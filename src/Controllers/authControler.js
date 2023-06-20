const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  console.log('Register');
  const { profile, bio, name, username, email, password, role } = req.body;

  //handle missing fields
  if (!name || !username || !email || !password || !role) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // handle duplicats
  const duplicates = await User.find({ $or: [{ username }, { email }] });
  if (duplicates.length > 0) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  // create new user
  const newUser = new User({
    profile: profile || '',
    bio: bio || '',
    name,
    username,
    email,
    password,
    role,
  });

  // save user and handle errors
  try {
    const user = await newUser.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }

  if (role.map((r) => r.toLowerCase()).includes('admin')) {
    // handle admin creation
    res.status(400).json({ msg: 'Not Authorized' });
  }
};

const login = async (req, res) => {
  console.log('Login');
  const { username, email, password } = req.body;
  console.log({ username, email, password });
  //handle missing fields
  if (!username && !email) {
    return res
      .status(400)
      .json({ msg: 'Please enter username or email' })
      .end();
  }
  if (!password) {
    return res.status(400).json({ msg: 'Please enter password' }).end();
  }

  //
  try {
    const user = await User.find({ $or: [{ username }, { email }] });
    if (user.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (password !== user[0].password) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    } else {
      const { username, email, role } = user[0];
      const token = jwt.sign(
        { username, email, role },
        process.env.JWT_SECRET,
        {
          expiresIn: 40,
        }
      );

      res.cookie('token', token, { maxAge: 40 * 1000, httpOnly: true });
      res.status(200).json({ msg: 'Login successful' });
    }
    // use jwt to generate token
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};
const refresh = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const newToken = jwt.sign(
        { user: decoded.user },
        process.env.JWT_SECRET,
        {
          expiresIn: 40,
        }
      );
      res.cookie('token', newToken, { maxAge: 40 * 1000, httpOnly: true });
      res.status(200).json({ msg: 'Token refreshed' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
};
const logout = (req, res) => {
  res.send('Logout');
};

module.exports = { register, login, refresh, logout };
