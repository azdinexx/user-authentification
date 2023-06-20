const router = require('express').Router();

const {
  register,
  login,
  refresh,
  logout,
} = require('../Controllers/authControler.js');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.delete('/logout', logout);

module.exports = router;
