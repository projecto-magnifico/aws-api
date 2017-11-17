const router = require('express').Router();
const {getTags, addTag} = require('../controllers/tagsCtrl')

router.get('/', getTags);
router.post('/',addTag);

module.exports=router;