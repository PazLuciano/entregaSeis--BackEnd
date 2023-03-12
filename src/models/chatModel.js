
const mongoose = require("mongoose")

const ChatCollection = "Chat"
const ChatSchema = new mongoose.Schema({
    email: {
        type: String,
        required : true
    },
    message: {
        type: String,
        required : true
    }

})

const chatModel = mongoose.model(ChatCollection, ChatSchema)

module.exports = chatModel;