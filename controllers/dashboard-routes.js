const router = require('express').Router();
const { Employee, User, Comment } = require('../models');
const auth = require('../utils/authentication');

router.get('/', auth, (req, res) => {
  Employee.findAll({
    attributes: [
      'id',
      'employee_name',
      'work_name',
      'position'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'star_style', 'Employee_id', 'user_id', 'created_at'],
      }
    ]
  })
    // map data to get content
    .then(dbEmployeeData => {
      const employees = dbEmployeeData.map(employee => employee.get({ plain: true }));
// render handlebar dashboard for this data and new data. 
        res.render("dashboard", { employees, loggedIn: true });
     
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', auth, (req, res) => {
  Employee.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'employee_name',
      'work_name',
      'position'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'star_style', 'employee_id', 'created_at'],

      }
    ]
  })
    .then(dbEmployeeData => {
      console.log(dbEmployeeData)
      if (!dbEmployeeData) {
        res.status(404).json({ message: 'No employee found with this id' });
        return;
      }
      const employee = dbEmployeeData.get({ plain: true });
      // render employee page so we can view reviews
      res.render('edit-employees', {
        employee,
        loggedIn: true 
        
      })
    })
    .catch(err => {
    
      res.status(500).json(err);
    });
});

router.get('/edit/comment/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'comment_text',
      'star-style'
    ],
  })
    .then(dbcommentData => {
      console.log(dbcommentData)
      if (!dbcommentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      const comment = dbcommentData.get({ plain: true });
      // render comment page so we can view reviews
      res.render('edit-comment', {
        comment,
        loggedIn: true 
        
      })
    })
    .catch(err => {
    
      res.status(500).json(err);
    });
});




module.exports = router;