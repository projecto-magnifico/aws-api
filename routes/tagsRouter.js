const router = require('express').Router();
const tagsCtrl = require('../controllers/tagsCtrl')

router.post('/',tagsCtrl)

module.exports=router;