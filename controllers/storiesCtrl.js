const fetchStories = require('../models/stories'); 

const getStories = (req, res) => {
    fetchStories()
        .then(stories => res.send(stories))
}


module.exports = getStories