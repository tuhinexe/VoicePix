const openai = require('../config/openAIConfig');


const getImage = async (prompt) => {
    try{
        const reponse = await openai.createImage({
             prompt: prompt,
             n: 1,
             size: "512x512",
        })
     const imageUrl = reponse.data.data[0].url;
        return imageUrl;
     } catch (err) {
         console.log(err);
     }
}

module.exports = getImage;