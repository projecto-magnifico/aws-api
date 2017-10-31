const router = require('express').Router(); 
const {getThreads, getThreadsById, getArticlesByThreadId, getKeywordsByThreadId, updateThreads, addArticle} = require('../controllers/threadsCtrl'); 


router.get('/', getThreads);
router.get('/:id', getThreadsById);
router.get('/:id/articles', getArticlesByThreadId);
router.get('/:id/keywords', getKeywordsByThreadId);
router.patch('/:id', updateThreads); 
router.post('/:id/articles', addArticle); 






module.exports=router; 