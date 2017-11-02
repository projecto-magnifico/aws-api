const fetchStories = require('../models/stories'); 

const getStories = (req, res) => {
   
    fetchStories()
        .then(stories => {
            Promise.all(stories)
                .then(stories => res.send(stories))
                .catch(err => console.log(err))
        })
          
}


module.exports = getStories