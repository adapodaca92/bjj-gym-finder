const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    gymName: String,
    location: String,
    review: String,

});

module.exports = mongoose.model('Post', PostSchema);