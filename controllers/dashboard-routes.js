const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all comments for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Comment.findAll({
    where: {
      user_id: req.session.user_id
    },
  })
    .then(dbCommentData => {
      const comment = dbCommentData.map(post => post.get({ plain: true }));
      res.render('dashboard', { comment, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new", withAuth, (req, res) => {
    res.render("new-comment", {
      layout: "dashboard"
    });
  });

router.get('/edit/:id', withAuth, (req, res) => {
  Comment.findByPk(req.params.id)
    .then(dbCommentData => {
      if (dbCommentData) {
        const post = dbCommentData.get({ plain: true });

        res.render("edit-post", {
            layout: "dashboard",
            post
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });  
       

module.exports = router;
