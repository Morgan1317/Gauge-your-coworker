const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/authentication');
// get all comments via /api/comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// get specific Employee post via id using /api/Employees/:id
router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    },
  attributes: [
  'id',
  'comment_text',
  'star_style'
],

  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No Comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// edit comments
router.put('/:id', auth,(req, res) => {
  Comment.update(req.body,
    {
      where: {
      id: req.params.id
    },
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No Comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// post comments via /api/comments,TODO add in authentication
router.post('/', auth, (req, res) => {
  Comment.create({
    employee_id: req.body.employee_id,
    comment_text: req.body.comment_text,
    star_style: req.body.star_style
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});


// delete comments - TODO add authentication in. 
router.delete('/:id', auth, (req, res) => {
    console.log('id', req.params.id);
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No Comment found with this id' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
