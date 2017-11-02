const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('../config'); 
const db = pgp(config); 

const fetchKeywords = (count, untagged) => {
    return untagged ? db.any('SELECT TOP $1 * FROM keywords tag_id IS NULL', count) :
    db.any('SELECT TOP $1 * FROM keywords', count)
}



module.exports = {

}