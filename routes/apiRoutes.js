const router = require('express').Router(); 
const threadRouter = require('./threadRoutes'); 


router.use('/threads', threadRouter);


module.exports=Router 