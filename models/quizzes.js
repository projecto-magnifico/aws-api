const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('../config'); 
const db = pgp(config); 


const ref = {
    quizId: 'quiz_id', 
    question: 'question', 
    state: 'state', 
    revisit: 'revisited_date', 
    created: 'date_created', 
    threadId: 'thread_id'
}



const fetchQuizzes = (count, restrictions) => {
    return db.any('SELECT * FROM quizzes WHERE status = $2 ORDER BY date_created DESC LIMIT $1;', [count, restrictions])
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
    return Promise.all(Object.keys(body).map(key => {
        return db.none('UPDATE quizzes SET $1 = $2 WHERE quiz_id = $3' [ref[key], body[ref[key]], id])
    }))
        .then(() => db.one('SELECT * FROM quizzes WHERE quiz_id = $1', id))
}

const addQuiz = (body, id) => {
    return db.one('INSERT INTO quizzes (thread_id, question, state, revisited_date) VALUES ($1, $2, $3, $4) RETURNING *', 
    [id, body.question, body.state, body.revisited_date])
}

const updateAnswer = (body, id, votes) => { 
    return votes ? db.one('UPDATE answers SET proto = $1, votes = 0 WHERE quiz_id = $2 returning *', [body.proto, id]):
    !body.votes ? db.one('UPDATE answers SET proto = $1 WHERE answer_id = $2 returning *', [body.proto, id]) : 
    db.one('UPDATE answers SET votes = votes + 1 WHERE answer_id = $2 returning *')
}

module.exports = {
    fetchQuizzes,
    fetchQuizById, 
    fetchAnswersByQuizId, 
    fetchVariations, 
    updateQuiz, 
    addQuiz
}