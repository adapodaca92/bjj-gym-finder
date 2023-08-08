const express = require('express');
const router = express.Router();
const gymPostController = require('../controllers/gymPostController');

router.get('/gymPosts', gymPostController.getPosts);
router.post('/gymPosts/create', gymPostController.createPost);

module.exports = router;
