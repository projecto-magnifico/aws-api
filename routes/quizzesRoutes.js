const router = require('express').Router();
const {getQuizzes, getQuizzesById} = require('../controllers/quizzesCtrl'); 



router.get('/', getQuizzes); 
router.get('/:id', getQuizzesById); 




module.exports=router; 