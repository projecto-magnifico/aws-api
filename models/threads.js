const pgp = require('pg-promise')(promiseLib: Promise); 
const config = require('../config'); 
const db = pgp(config); 

const fetchThreads = (count=10, unnamed, summary) => {
    if (!unnamed && !summary) {
        return db.any('SELECT TOP $1 * FROM threads ORDER BY score DESC;', count);
    }
    else if (unnamed && !summary) {
        return db.any('SELECT TOP $1 * FROM threads WHERE name IS NULL ORDER BY score DESC;', count);
    }
    else if (!unnamed && summary) {
        return summary === 'null' ? db.any('SELECT TOP $1 * FROM threads WHERE summary_1 IS NULL ORDER BY score DESC;', count) :
        db.any('SELECT TOP $1 * FROM threads WHERE summary_1 IS NULL OR date_created < DATEADD(d, -3, GETDATE()) ORDER BY score DESC;');
    }
    else {
        return summary === 'null' ? db.any('SELECT TOP $1 * FROM threads WHERE name IS NULL AND summary_1 IS NULL ORDER BY score DESC;', count) :
        db.any('SELECT TOP $1 * FROM threads WHERE name IS NULL AND (summary_1 IS NULL OR date_created < DATEADD(d, -3, GETDATE())) ORDER BY score DESC;');
    }
}

const fetchThreadsById = (id) => {
    return db.any('SELECT * FROM threads WHERE thread_id = $1', id);
}

const fetchArticlesByThreadId = (id) => {
    return db.any('SELECT * FROM articles WHERE thread_id = $1', id)
}

const fetchKeywordsByThreadId = (id) => {
    return db.any('SELECT * FROM keywords WHERE thread_id = $1', id)
}

const updateThreads = (body, id) => {
    return Promise.all(Object.keys(body).map(column => {
        return db.none('UPDATE threads SET $1 = $2 WHERE thread_id = $3;', [column, body[column], id])
    }))
        .then(() => {
            return db.any('SELECT * FROM threads WHERE thread_id = $1', id)
        })
}

const addArticleToThread = (article, id) => {
    return db.one('INSERT INTO articles (thread_id, title, description, url, age, source_id, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;' [id, article.title, article.description, article.url, article.age, article.source_id, article.urlToImage])
}


module.exports={fetchThreads, fetchThreadsById, fetchArticlesByThreadId, fetchKeywordsByThreadId}; 