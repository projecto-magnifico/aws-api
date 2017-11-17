const db = require('../');

const postTag = (tag) => {
    console.log('TagName', tag.name);
    console.log('TagType', tag.type);
    console.log('TagDetail', tag.detail);
    return db.one('INSERT INTO tags (name, type, detail) VALUES ($1, $2, $3);'[tag.name, tag.type, tag.detail])
    .then(res => {
        console.log('QUERY END');
    })
    .catch(console.error);
}

module.exports = postTag