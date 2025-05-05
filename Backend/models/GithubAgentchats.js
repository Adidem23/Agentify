const mongoose = require('mongoose');

const GithubChatsMetadata = new mongoose.Schema({
    user:{
        type: String,
    },
    userEmail:{
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('GithubAgentChats', GithubChatsMetadata);
