const router = require('express').Router(); 
const {getThreads, getThreadsById, getArticlesByThreadId, getKeywordsByThreadId, updateThreads} = require('../controllers/threadsCtrl'); 


router.get('/', getThreads);
router.get('/:id', getThreadsById);
router.get('/:id/articles', getArticlesByThreadId);
router.get('/:id/keywords', getKeywordsByThreadId);
router.patch('/:id', updateThreads); 





module.exports=router; 