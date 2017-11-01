const {addQuiz, fetchQuizzes, fetchQuizById, fetchAnswersByQuizId, fetchQuizzesByThreadId, fetchVariations, 
    updateQuiz, updateAnswer} = require('../models/quizzes')


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

const patchQuiz = (req, res) => {
    const id = req.params.id
    const {body} = req; 
    updateQuiz(id)
        .then(quiz => res.send(quiz))
}

const postQuiz = (req, res) => {
     const {body} = req; 
     const {id} = req.params
     addQuiz(body, id) 
        .then(quiz => res.send(quiz)); 
}

const patchAnswer = (req, res) => {
    const {body} = req; 
    const {id} =  req.params;
    updateAnswer(body, id
        .then(answer => res.send(answer))
}

module.exports = {
    getQuizzes, 
    getQuizById, 
    getQuizByThreadId, 
    getVariations, 
    patchQuiz, 
    postQuiz, 
    patchAnswer 
}