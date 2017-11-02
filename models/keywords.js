const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('../config'); 
const db = pgp(config); 

const fetchKeywords = (count, untagged) => {
    return untagged ? db.any('SELECT TOP $1 * FROM keywords tag_id IS NULL;', count) :
    db.any('SELECT TOP $1 * FROM keywords;', count)
}

const fetchKeywordById = (id) => {
    return db.one('SELECT * FROM keywords WHERE thread_id = $1;', id)
}

const updateKeyword = (body, id) => {
    Promise.all(Object.keys(body).map(key => {
        return db.none('UPDATE keywords SET $1 = $2 WHERE keyword_id = $1;', [key, body[key], id])
    }))
        .then(() => {
            return db.one('SELECT * FROM keywords WHERE keyword_id = $1', id)
        })
}


module.exports = {
    fetchKeywords, 
    fetchKeywordById, 
    updateKeyword
}