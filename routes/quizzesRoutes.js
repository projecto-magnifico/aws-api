const router = require('express').Router();
const {getQuizzes} = require('../controllers/quizzesCtrl'); 



router.get('/', getQuizzes); 



module.exports=router; 