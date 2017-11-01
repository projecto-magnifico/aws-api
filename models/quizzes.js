const pgp = require('pg-promise')(promiseLib: Promise); 
const config = require('../config'); 
const db = pgp(config); 




const fetchQuizzes = (count, restrictions) => {
    return db.any('SELECT TOP $1 * FROM quizzes WHERE status = $2 ORDER BY date_created DESC', [count, restrictions])
}


module.exports = {
    fetchQuizzes
}