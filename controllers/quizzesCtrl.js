const {fetchQuizzes, fetchQuizById} = require('../models/quizzes')


const getQuizzes = (req, res) => {
    const {count, restriction} = req.query
    fetchQuizzes(count, restriction)
        .then(quizzes => res.send(quizzes))
}

const getQuizById = (req, res) => {
    const id = req.params.id; 
    fetchQuizById(id)
        .then(quiz => res.s)
}



module.exports = {
    getQuizzes, 
    getQuizById
}