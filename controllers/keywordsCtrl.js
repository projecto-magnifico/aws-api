const {fetchKeywords, fetchKeywordById, updateKeyword} = require('../models/keywords'); 


const getKeywords = (req, res) => {
    const {count, untagged} = req.query; 
    fetchKeywords(count, untagged) 
        .then(keywords => res.send(keywords))
}

const getKeywordById = (req, res) => {
    const id = req.params.id; 
    fetchKeywordById(id)
        .then(keyword => res.send(keyword))

}

const patchKeyword = (req, res) => {
    const id = req.params.id; 
    const {body} = req; 
    updateKeyword(body, id)
        .then(keyword => res.send(keyword))    
}


module.exports = {
    getKeywords, 
    getKeywordById, 
    patchKeyword
}