const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
    getPosts: async (req, res) => {
        const posts = await Post.find();
        res.json(posts);
    },
    createPost: async (req, res) => {
        const {gymName, location, review} = req.body;
        const post = await Post.create({
            gymName,
            location,
            review,
        });
        res.json(post);
    }
}