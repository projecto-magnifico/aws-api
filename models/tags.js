const db = require('../');

const fetchTags = () => {
    return db.any('SELECT * FROM tags')
    .catch(console.error);
}

const postTag = (tag) => {
    return db.one('INSERT INTO tags (name, type, detail) VALUES ($1, $2, $3);', [tag.name, tag.type, tag.detail])
    .then(res => {
        console.log('QUERY END');
    })
    .catch(console.error);
}

module.exports = {fetchTags, postTag}