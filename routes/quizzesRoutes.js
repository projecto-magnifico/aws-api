const router = require('express').Router();
const {getQuizzes, getQuizById, getQuizByThreadId, getVariations, patchQuiz, postQuiz,
    patchAnswer} = require('../controllers/quizzesCtrl'); 



router.get('/', getQuizzes); 
router.get('/:id', getQuizById); 
router.get('/:thread_id', getQuizByThreadId); 
router.get('/:answer_id/variations', getVariations); 
router.patch('/:id', patchQuiz); 
router.post('/:id', postQuiz); 
roter.patch('/quizzes/answers/:id', patchAnswer);




module.exports=router; 