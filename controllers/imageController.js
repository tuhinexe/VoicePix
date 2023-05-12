const getImage = require('../api/getImage')
const getTranscription = require('../api/getTranscription');


const imageController = async (req, res) => {
    try{
        let prompt = ""
        const file = req.file.path;
        prompt = await getTranscription(file);
        !prompt ? prompt = "No prompt found" : prompt = prompt
        const result = await getImage(prompt);
        res.json({data:result,prompt:prompt,url:true})
        prompt=""
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = imageController