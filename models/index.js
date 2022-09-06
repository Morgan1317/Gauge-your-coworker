const Employee = require('./Employee');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Employee, {
    foreignKey: 'user_id'
});
Employee.belongsTo(User, {
    foreignKey: 'user_id'
});


User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'set NULL'
});

Employee.hasMany(Comment, {
    foreignKey: 'employee_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
foreignKey: 'user_id'
});

Comment.belongsTo(Employee, {
    foreignKey: 'employee_id'
});

module.exports = { Employee, User, Comment };