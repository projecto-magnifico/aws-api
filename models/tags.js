const db = require('../');

const postTag = (tag) => {
    console.log('Tag', tag);
    return db.one('INSERT INTO tags (name, type, detail) VALUES ($1, $2, $3);'[tag.name, tag.type, tag.detail])
    .then(res => {
        console.log('QUERY END');
    })
    .catch(console.error);
}

module.exports = postTag