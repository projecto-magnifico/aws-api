const router = require('express').Router();
const {getQuizzes, getQuizById, getQuizByThreadId, getVariations, patchQuiz, postQuiz,
    patchAnswer, postAnswer} = require('../controllers/quizzesCtrl'); 



router.get('/', getQuizzes); 
router.get('/:id', getQuizById); 
router.get('/threads/:thread_id', getQuizByThreadId); //
router.get('/:answer_id/variations', getVariations); 
router.patch('/:id', patchQuiz); 
router.post('/:id', postQuiz); 
router.patch('/answers/:id', patchAnswer);
router.post('/answers/:quiz_id', postAnswer);





module.exports=router; 