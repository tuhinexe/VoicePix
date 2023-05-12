const router = require('express').Router();
const upload = require('../config/multerConfig')

const homeController = require('../controllers/homeController');
const chatController = require('../controllers/chatController')
const imageController = require('../controllers/imageController')

router.get('/', homeController);
router.post('/chat',upload.single('audio'),chatController)
router.post('/image',upload.single('audio'), imageController)


module.exports = router;