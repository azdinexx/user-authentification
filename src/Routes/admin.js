const router = require('express').Router();
const { createAdmin } = require('../Controllers/adminController.js');

router.post('/create-admin', createAdmin);
router.get('/test', (req, res) => {
  res.send('Admin route');
});

module.exports = router;
