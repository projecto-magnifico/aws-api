const {fetchThreads, fetchThreadsById, fetchArticlesByThreadId} = require('../models/threads'); 

const getThreads = (req, res) => {
    const {count, unnamed, summary} = req.query;
    fetchThreads(count, unnamed, summary)
        .then(threads => res.send(threads));
}

const getThreadsById = (req, res) => {
    const id = req.query.id; 
    fetchThreadsById(id); 
        .then(threads => res.send(threads));
}

const getArticlesByThreadId = (req, res) => {
    const id = req.query.id; 
    fetchArticlesByThreadId(id)
        .then(threads => res.send(threads))    
}


module.exports={getThreads, getThreadsById, getArticlesByThreadId}; 

