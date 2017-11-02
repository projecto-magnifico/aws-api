const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('../config'); 
const db = pgp(config);


const postTag = (tag) => {
    return db.one('INSERT INTO tags (name, type, detail) VALUES ($1, $2, $3) RETURNING *;'[tag.name, tag.type, tag.detail])
}

module.exports = postTag