const openai = require('../config/openAIConfig');
const fs = require('fs');
const getTranslation = require('./getTranslation');



const getTranscription = async (file) =>{
    try {
        const audio = fs.createReadStream(file);
        const response = await openai.createTranscription(audio, 'whisper-1');
        const transcript = response.data.text;
        const checkRegExp = /^[A-Za-z0-9,.!?'"():;{}\[\]\-+\s]*$/;
        if (!checkRegExp.test(transcript)) {
          const translatedPrompt = await getTranslation(transcript);
          return translatedPrompt;
        } else {
          return transcript;
        }
      } catch (err) {
        throw new Error("Error occurred while transcribing audio");
      } finally {
        // Delete the uploaded file from the server
        fs.unlink(file, err => {
          if (err) throw new Error("Error occurred while deleting file")
        });
      }
}

module.exports = getTranscription;