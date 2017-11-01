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
const fetchQuizzesByThreadId = (id) => {
    return db.any(
        `
        SELECT * 
        FROM (
            SELECT *
            FROM quizzes q
            FULL OUTER JOIN answers a 
            ON q.quiz_id = a.quiz_id
        ) joined 
        WHERE thread_id = $1;
        ` , id
    )
}

const fetchVariations = (id) => {
    return db.any('SELECT * FROM variations WHERE answer_id = $1', id)
}

const updateQuiz = (body, id) => {
    Promise.all(Object.keys(body).map(key => {
        db.none('UPDATE quizzes SET $1 = $2 WHERE quiz_id = $3' [key, body[key], id])
    }))
        .then(() => db.one('SELECT * FROM quizzes WHERE quiz_id = $1', id))
}

module.exports = {
    fetchQuizzes,
    fetchQuizById, 
    fetchAnswersByQuizId, 
    fetchVariations, 
    updateQuiz
}