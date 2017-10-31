const router = require('express').Router(); 
const {getThreads, getThreadsById, getArticlesByThreadId} = require('../controllers/threadsCtrl'); 


router.get('/', getThreads);
router.get('/:id', getThreadsById);
router.get('/:id/articles', getArticlesByThreadId);





module.exports=router; 