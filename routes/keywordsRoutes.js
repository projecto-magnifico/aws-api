const router = require('express').Router(); 
const {getKeywords, getKeywordById, patchKeyword} = require('../controllers/keywordsCtrl'); 


router.get('/', getKeywords); 
router.get('/:id', getKeywordById);
router.patch('/:id', patchKeyword); 






module.exports = router; 