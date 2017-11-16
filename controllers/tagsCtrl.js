const postTag = require('../models/tags');

const addTag = (req, res) => {
    const body = req.body;
    console.log('BODY', body);
    postTag(body)
    .then(newTag => res.send(newTag) )
};

module.exports = addTag;