const { new: create } = require('../controllers/UsersController');

module.exports = router => {
  router.post('/register', create);
  router.post('/users', create);
};