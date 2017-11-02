const router = require('express').Router(); 
const threadRouter = require('./threadRoutes'); 
const quizzesRouter = require('./quizzesRoutes'); 



router.use('/threads', threadRouter);
router.use('/keywords', keywordsRouter);
router.use('/quizzes', quizzesRouter);



module.exports=Router 