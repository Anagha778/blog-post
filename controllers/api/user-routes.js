const router = require('express').Router();
const { User,Post,Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  User.findAll({
      attributes: { exclude: ['password'] }
    })
.then(dbUserData => res.json(dbUserData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});


// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(dbUserData => {    
        res.json(dbUserData);      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;