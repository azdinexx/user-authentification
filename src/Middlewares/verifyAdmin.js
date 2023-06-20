const verifyAdmin = (req, res, next) => {
  // check if the roles array contains admin
  // if not, return unauthorized and exit
  if (!req.user.role.map((r) => r.toLowerCase()).includes('admin')) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  next();
};

module.exports = { verifyAdmin };
