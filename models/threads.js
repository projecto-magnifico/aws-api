const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('../config'); 
const db = pgp(config); 

// threads summaries as arr
const fetchThreads = (count, unnamed, summary) => {0
    if (!unnamed && !summary) {
        return db.any('SELECT * FROM threads ORDER BY score DESC LIMIT $1;', count)
        .catch(console.error);
    }
    else if (unnamed && !summary) {
        return db.any('SELECT * FROM threads WHERE name IS NULL ORDER BY score DESC LIMIT $1;', count)
        .catch(console.error);
    }
    else if (!unnamed && summary) {
        return summary === 'null' ? db.any('SELECT * FROM threads WHERE summary_1 IS NULL ORDER BY score DESC LIMIT $1;', count) :
        db.any('SELECT * FROM threads WHERE summary_1 IS NULL OR date_created < DATEADD(d, -3, GETDATE()) ORDER BY score DESC LIMIT $1;')
        .catch(console.error);
    }
    else {
        return summary === 'null' ? db.any('SELECT TOP $1 * FROM threads WHERE name IS NULL AND summary_1 IS NULL ORDER BY score DESC;', count) :
        db.any('SELECT TOP $1 * FROM threads WHERE name IS NULL AND (summary_1 IS NULL OR date_created < DATEADD(d, -3, GETDATE())) ORDER BY score DESC;')
        .catch(console.error);

    }
}

const fetchThreadsById = (id) => {
    return db.any('SELECT * FROM threads WHERE thread_id = $1', id)
    .catch(console.error);
}

const fetchArticlesByThreadId = (id) => {
    return db.any('SELECT * FROM articles WHERE thread_id = $1', id)
    .catch(console.error);
}

const fetchKeywordsByThreadId = (id) => {
    console.log(id)
    return db.any('SELECT * FROM keywords WHERE thread_id = $1', id)
    .catch(console.error);
}

//add functionality to update each of the 3 summmary columns - also will only patch one col at a time so drop Promise.all
const updateThreads = (body, id) => {
    return Promise.all(Object.keys(body).map(column => {
        return db.none('UPDATE threads SET $1 = $2 WHERE thread_id = $3 RETURNING *;', [column, body[column], id])
        .catch(console.error);
    }))
        .then(() => {
            return db.any('SELECT * FROM threads WHERE thread_id = $1', id)
            .catch(console.error);
        })
}

const addArticleToThread = (article, id) => {
    return db.one('INSERT INTO articles (thread_id, title, description, url, age, source_id, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;' [id, article.title, article.description, article.url, article.age, article.source_id, article.urlToImage])
    .catch(console.error);
}


module.exports={fetchThreads, fetchThreadsById, fetchArticlesByThreadId, fetchKeywordsByThreadId, updateThreads}; 