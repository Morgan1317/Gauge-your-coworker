const router = require('express').Router();
const { Employee, User, Comment } = require('../../models');
const auth = require('../../utils/authentication');

// get all Employee post at /api/Employees
router.get('/', (req, res) => {
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
    .then(dbEmployeeData => res.json(dbEmployeeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// get specific Employee post via id using /api/Employees/:id
router.get('/:id', auth, (req, res) => {
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
    attributes: ['id', 'comment_text', 'star_style', 'Employee_id', 'created_at'],

  }
]
  })
    .then(dbEmployeeData => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: 'No Employee found with this id' });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// add a Employee post via api/Employees TODO need to add authentication in later
router.post('/', auth, (req, res) => {

  Employee.create({
    employee_name: req.body.employee_name,
    work_name: req.body.work_name,
    position: req.body.position
  })
    .then(dbEmployeeData => res.json(dbEmployeeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// edit Employee post via its id api/Employees/:id, TODO add in authentication
router.put('/:id', auth, (req, res) => {
  Employee.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbEmployeeData => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: 'No Employee found with this id' });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// allows user to delete Employee posting via its id api/Employees/:id TODO Add Authentication back in
router.delete('/:id', auth, (req, res) => {
  console.log('id', req.params.id);
  Employee.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbEmployeeData => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: 'No Employee found with this id' });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
