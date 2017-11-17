const {fetchTags, postTag} = require('../models/tags');

const getTags = (req, res) => {
    fetchTags()
    .then(tags => res.send(tags))
};

const addTag = (req, res) => {
    const body = req.body;
    postTag(body)
    .then(newTag => res.send(newTag))
};

module.exports = {getTags, addTag};