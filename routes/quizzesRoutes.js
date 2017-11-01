const router = require('express').Router();
const {getQuizzes, getQuizById, getQuizByThreadId, getVariations, patchQuiz} = require('../controllers/quizzesCtrl'); 



router.get('/', getQuizzes); 
router.get('/:id', getQuizById); 
router.get('/:thread_id', getQuizByThreadId); 
router.get('/:answer_id/variations', getVariations); 
router.patch('/quizzes/:id', patchQuiz); 





module.exports=router; 