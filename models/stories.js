const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('../config'); 
const db = pgp(config); 
const {fetchArticlesByThreadId} = require('./threads'); 
const {fetchKeywordById} =require('./keywords');
const {fetchQuizzesByThreadId} = require('./quizzes'); 




const fetchStories = () => {
    return db.any('SELECT * FROM threads ORDER BY score LIMIT 10;')
        .then(threads => {
            return threads.map(thread => {
                const obj = {
                    name: thread.name,
                    score: thread.score, 
                    summary: [thread.summary_1, thread.summary_2, thread.summary_3]
                }
               return  fetchArticlesByThreadId(thread.thread_id)
                    .then(articles => {
                        obj.articles = articles;
                        // console.log(articles,"3")
                        return fetchKeywordById(thread.thread_id)
                            .then(keywords => {
                                obj.keywords = keywords; 
                                // console.log(keywords,"4")
                               return  fetchQuizzesByThreadId(thread.thread_id)
                                    .then(quizzes => {
                                        // console.log(quizzes,"5")
                                        obj.quizzes = quizzes; 
                                        // console.log(obj,"OBJ")
                                        return obj
                                    })
                            })
                    })
            })
        })
}


module.exports = fetchStories