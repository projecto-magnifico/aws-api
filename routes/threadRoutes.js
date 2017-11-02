const router = require('express').Router(); 
const {getThreads, getThreadsById, getArticlesByThreadId, getKeywordsByThreadId, addArticle, patchThreads} = require('../controllers/threadsCtrl'); 


router.get('/', getThreads); //tested
router.get('/:id', getThreadsById); //tested
router.get('/:id/articles', getArticlesByThreadId); //tested
router.get('/:id/keywords', getKeywordsByThreadId); //tested
router.patch('/:id', patchThreads); 
router.post('/:id/articles', addArticle); 

module.exports=router; 