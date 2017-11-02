const {fetchKeywords} = require('../models/keywords'); 


const getKeywords = (req, res) => {
    const {count, untagged} = req.query; 
    fetchKeywords(count, untagged) 
        .then(keywords => res.send(keywords))
}



module.exports = {
    getKeywords
}