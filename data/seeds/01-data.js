const users = [
            { username: 'Iron Man', password: 1234 },
            { username: 'Thor', password: 5678 },
];
exports.users = users;

exports.seed = function(knex) {
    return knex('users').insert(users)
}