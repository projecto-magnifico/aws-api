const db = require('../');

const postTag = (tag) => {
    return db.one('INSERT INTO tags (name, type, detail) VALUES ($1, $2, $3) RETURNING *;'[tag.name, tag.type, tag.detail])
}

module.exports = postTag