const postTag = require('')



const addTag = (req, res) => {
    const body = req.body;
    postTag(body)
    .then(newTag => res.send(newTag) )
};

module.exports = addTag;