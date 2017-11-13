const db = require('../');
const {fetchArticlesByThreadId} = require('./threads'); 
const {fetchKeywordById} =require('./keywords');
const {fetchQuizzesByThreadId} = require('./quizzes'); 

const fetchStories = () => {
    return db.any('SELECT * FROM threads ORDER BY score LIMIT 10;')
        .then(threads => {
            return Promise.all(threads.map(thread => {
                const obj = {
                    name: thread.name,
                    score: thread.score, 
                    summary: [thread.summary_1, thread.summary_2, thread.summary_3]
                }
                return Promise.all([
                    fetchArticlesByThreadId(thread.thread_id),
                    fetchKeywordById(thread.thread_id),
                    fetchQuizzesByThreadId(thread.thread_id)  
                ])
                .then((articles, keywords, quizzes) => {
                    obj.articles = articles;
                    obj.keywords = keywords;
                    obj.quizzes = quizzes;
                    return obj;
                })      
            }))
        })
}


module.exports = fetchStories