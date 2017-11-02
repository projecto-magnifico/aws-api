const router = require('express').Router(); 
const getStories = require('../controllers/storiesCtrl'); 

router.get('/', getStories);


module.exports=router; 