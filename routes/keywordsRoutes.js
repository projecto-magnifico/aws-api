const router = require('express').Router(); 
const {getKeywords} = require('../controllers/keywordsCtrl'); 


router.get('/', getKeywords); 




module.exports = router; 