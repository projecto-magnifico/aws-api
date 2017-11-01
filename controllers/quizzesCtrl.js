const {fetchQuizzes, fetchQuizById, fetchAnswersByQuizId, fetchQuizzesByThreadId, fetchVariations} = require('../models/quizzes')


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

//test
const getQuizByThreadId = (req, res) => {
    const thread_id = req.params.thread_id; 
    fetchQuizzesByThreadId(thread_id)
        .then(quizzes => {
            const arr = quizzes.map(quiz => {
                quizId: quiz.quiz_id, 
                question: quiz.question, 
                state: quiz.state, 
                revisit: quiz.revisited_date, 
                created: quiz.date_created, 
                answers: quizzes.reduce((acc, ans) => {
                    if (ans.quiz_id === quiz.quiz_id) {
                        acc.push({proto: answer.proto, votes: answer.votes});
                    }
                    return acc; 
                }, []) 
            });
            res.send(arr);
        });
}

const getVariations = (req, res) => {
    const id = req.params.answer_id
    fetchVariations()
        .then(variations => res.send(variations))
} 


module.exports = {
    getQuizzes, 
    getQuizById, 
    getQuizByThreadId, 
    getVariations
}