const express = require('express');
const router = express.Router();
const gymPostController = require('../controllers/gymPostController');

router.get('/viewPosts', gymPostController.getPosts);
router.post('/create', gymPostController.createPost);

module.exports = router;
