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
        return summary === 'null' ? db.any('SELECT TOP $1 * FROM threads WHERE summary IS NULL ORDER BY score DESC;', count) :
        db.any('SELECT TOP $1 * FROM threads WHERE summary IS NULL OR date_created < DATEADD(d, -3, GETDATE()) ORDER BY score DESC;');
    }
    else {
        return summary === 'null' ? db.any('SELECT TOP $1 * FROM threads WHERE name IS NULL AND summary IS NULL ORDER BY score DESC;', count) :
        db.any('SELECT TOP $1 * FROM threads WHERE name IS NULL AND (summary IS NULL OR date_created < DATEADD(d, -3, GETDATE())) ORDER BY score DESC;');
    }
}

const fetchThreadsById = (id) => {
    return db.any('SELECT * FROM threads WHERE thread_id = $1', id);
}


module.exports={fetchThreads, fetchThreadsById}; 