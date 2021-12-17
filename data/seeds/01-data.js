exports.seed = function(knex) {
    return knex('users')
    .truncate()
    .then(function() {
        return knex('users').insert([
            { username: 'Iron Man', password: 1234 },
            { username: 'Thor', password: 5678 },
           
        ])
    })
}