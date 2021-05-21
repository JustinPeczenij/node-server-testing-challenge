const db = require('../../data/dbconfig')

async function create(user) {
    const id = await db('users').insert(user)
    return db('users as u').where('id', id).select('u.username', 'u.password', 'u.email').first()
}

function remove(user) {
    return db('users').where(user).del()
}

module.exports = {
    create,
    remove
}