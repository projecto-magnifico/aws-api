const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('../config'); 
const db = pgp(config); 




const fetchQuizzes = (count, restrictions) => {
    return db.any('SELECT TOP $1 * FROM quizzes WHERE status = $2 ORDER BY date_created DESC', [count, restrictions])
}

const fetchQuizById = (id) => {
    return db.one('SELECT * FROM quizzes WHERE quiz_id = $1', id)
}

const fetchAnswersByQuizId = (id) => {
    return db.any('SELECT * FROM answers WHERE quiz_id = $1', id)
}


module.exports = {
    fetchQuizzes,
    fetchQuizById
}