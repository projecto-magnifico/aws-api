const router = require('express').Router(); 
const {getThreads, getThreadsById, getArticlesByThreadId} = require('../controllers/threadsCtrl'); 


router.get('/', getThreads);
router.get('/:id', getThreadsById);



module.exports=router; 