const chatModel = require("../models/chatModel");


class ChatManager {
    
    async getMessages() {
        const messages = await chatModel.find({})
        return messages
    }
}

module.exports = ChatManager