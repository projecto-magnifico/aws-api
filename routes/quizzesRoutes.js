const router = require('express').Router();
const {getQuizzes, getQuizById, getQuizByThreadId, getVariations} = require('../controllers/quizzesCtrl'); 



router.get('/', getQuizzes); 
router.get('/:id', getQuizById); 
router.get('/:thread_id', getQuizByThreadId); 
router.get('/:answer_id/variations', getVariations); 






module.exports=router; 