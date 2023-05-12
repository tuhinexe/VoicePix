const openai = require('../config/openAIConfig');


const getChat = async (prompt) => {
    try{
        const chatResult = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ]
          });
          const result = chatResult.data.choices[0].message.content;
            return result;

    } catch (err) {
    }
}

module.exports = getChat;