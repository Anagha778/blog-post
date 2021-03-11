const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
      attributes: ['id','title','created_at']
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
       // console.log(dbPostData[0]);
       res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      console.log("user already logged in");
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    /*if (req.session.loggedIn) {
      console.log("user already logged in");
      res.redirect('/');
      return;
    }*/
    res.render('signup');
  });
  

  module.exports = router;