const db = require('../');
const {fetchArticlesByThreadId, fetchKeywordsByThreadId} = require('./threads'); 
const {fetchQuizzesByThreadId} = require('./quizzes'); 

const fetchStories = () => {
    return db.any('SELECT * FROM threads ORDER BY score DESC LIMIT 10;')
        .then(threads => {
            return Promise.all(threads.map(thread => {
                console.log('#########THREAD', thread);
                const obj = {
                    name: thread.name,
                    score: thread.score, 
                    summary: [thread.summary_1, thread.summary_2, thread.summary_3]
                }
                return Promise.all([
                    fetchArticlesByThreadId(thread.thread_id)
                        .then(articles => {
                            obj.articles = articles;
                        }),
                    fetchKeywordsByThreadId(thread.thread_id)
                        .then(keywords => {
                            obj.keywords = keywords;
                        }),
                    fetchQuizzesByThreadId(thread.thread_id)
                        .then(quizzes => {
                            obj.quizzes = quizzes;
                        })
                ])
                .then(() => {        
                    return obj;
                })      
            }))
        })
}


module.exports = fetchStories