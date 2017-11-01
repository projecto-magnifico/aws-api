const {fetchQuizzes} = require('../models/quizzes')


const getQuizzes = (req, res) => {
    const {count, restriction} = req.query
    fetchQuizzes(count, restriction)
        .then(quizzes => res.send(quizzes))
}





module.exports = {
    getQuizzes
}