const {fetchThreads, fetchThreadsById, fetchArticlesByThreadId, fetchKeywordsByThreadId, updateThreads, addArticleToThread} = require('../models/threads'); 

const getThreads = (req, res) => {
    const {count, unnamed, summary} = req.query;
    fetchThreads(count, unnamed, summary)
        .then(threads => res.send(threads));
}

const getThreadsById = (req, res) => {
    const id = req.query.id; 
    fetchThreadsById(id) 
        .then(threads => res.send(threads));
}

const getArticlesByThreadId = (req, res) => {
    const id = req.query.id; 
    fetchArticlesByThreadId(id)
        .then(threads => res.send(threads))    
}

const getKeywordsByThreadId = (req, res) => {
    const id = req.query.id; 
        fetchKeywordsByThreadId(id)
            .then(threads => res.send(threads))    
    
}

const patchThreads = (req, res) => {
    const body = req.body;
    const id = req.query.id;     
    updateThreads(body, id)
        .then(updatedThread => res.send(updatedThread))
}

const addArticle = (req, res) => {
    const body = req.body;
    const id = req.query.id;     
    addArticleToThread(body, id)
        .then(updatedThread => res.send(updatedThread))
}


module.exports={getThreads, getThreadsById, getArticlesByThreadId, getKeywordsByThreadId, patchThreads, addArticle}; 

