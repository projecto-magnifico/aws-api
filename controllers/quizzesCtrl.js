const {fetchQuizzes, fetchQuizById, fetchAnswersByQuizId} = require('../models/quizzes')


const getQuizzes = (req, res) => {
    const {count, restriction} = req.query
    fetchQuizzes(count, restriction)
        .then(quizzes => res.send(quizzes))
}

const getQuizById = (req, res) => {
    const id = req.params.id; 
    fetchQuizById(id)
        .then(quiz => {
            fetchAnswersByQuizId(id)
                .then(answers => {
                    res.send({
                        quizId: id, 
                        question: quiz.question, 
                        state: quiz.state, 
                        revisit: quiz.revisited_date, 
                        created: quiz.date_created, 
                        answers: answers.map((answer) => {proto: answer.proto, votes: answer.votes})
                    })
                })
        })
}



module.exports = {
    getQuizzes, 
    getQuizById
}