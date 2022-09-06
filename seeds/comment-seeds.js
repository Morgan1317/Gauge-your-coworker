const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Nunc rhoncus dui vel sem.',
        user_id: 2,
        employee_id: 4,
        star_style: 2
    },
    {
        comment_text: 'Aliquam erat volutpat. In congue.',
        user_id: 1,
        employee_id: 3,
        star_style: 1
    },
    {
        comment_text: 'In hac habitasse platea dictumst.',
        user_id: 4,
        employee_id: 6,
        star_style: 4
    },
    {
        comment_text: 'Vivamus vestibulum sagittis sapien.',
        user_id: 3,
        employee_id: 5,
        star_style: 3
    },
    {
        comment_text: 'Morbi a ipsum.',
        user_id: 5,
        employee_id: 2,
        star_style: 5
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;