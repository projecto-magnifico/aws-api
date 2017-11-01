const router = require('express').Router();
const {getQuizzes, getQuizById} = require('../controllers/quizzesCtrl'); 



router.get('/', getQuizzes); 
router.get('/:id', getQuizById); 




module.exports=router; 