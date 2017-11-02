const router = require('express').Router(); 
const threadRouter = require('./threadRoutes'); 
const quizzesRouter = require('./quizzesRoutes'); 
const tagsRouter = require('./tagsRouter')



router.use('/threads', threadRouter);
router.use('/keywords', keywordsRouter);
router.use('/quizzes', quizzesRouter);
router.use('/tags', tagsRouter);



module.exports=Router 