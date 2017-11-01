const router = require('express').Router(); 
const threadRouter = require('./threadRoutes'); 


router.use('/threads', threadRouter);
router.use('/keywords', keywordsRouter);



module.exports=Router 