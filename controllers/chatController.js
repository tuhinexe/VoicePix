const getChat = require('../api/getChat');
const getTranscription = require('../api/getTranscription');


const chatController = async (req, res) => {
    try{
        let prompt = ""
        const file = req.file.path;
        prompt = await getTranscription(file);
        const result = await getChat(prompt);
        res.json({data:result,prompt: prompt,url:false})
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = chatController