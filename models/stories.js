const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('../config'); 
const db = pgp(config); 
const {fetchArticlesByThreadId} = require('./threads'); 
const {fetchKeywordById} =require('./keywords');
const {fetchQuizzesByThreadId} = require('./quizzes'); 




const fetchStories = () => {
    db.any('SELECT TOP 10 * FROM threads ORDER BY score')
        .then(threads => {
            return threads.map(thread => {
                const obj = {
                    name: thread.name,
                    score: thread.score, 
                    summary: [thread.summary_1, thread.summary_2, thread.summary_3]
                }
                fetchArticlesByThreadId(thread.thread_id)
                    .then(articles => {
                        obj.articles = articles;
                        fetchKeywordById(thread.thread_id)
                            .then(keywords => {
                                obj.keywords = keywords; 
                                fetchQuizzesByThreadId(thread.thread_id)
                                    .then(quizzes => {
                                        obj.quizzes = quizzes; 
                                        return obj
                                    })
                            })
                    })
            })
        })
}


module.exports = fetchStories