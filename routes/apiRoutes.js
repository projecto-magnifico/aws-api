const router = require('express').Router(); 
const threadRouter = require('./threadRoutes'); 
const quizzesRouter = require('./quizzesRoutes'); 
const tagsRouter = require('./tagsRouter');
const storiesRouter = require('./storiesRouter');


router.use('/threads', threadRouter);
router.use('/keywords', keywordsRouter);
router.use('/quizzes', quizzesRouter);
router.use('/tags', tagsRouter);
router.use('/stories', storiesRouter);




module.exports=Router 