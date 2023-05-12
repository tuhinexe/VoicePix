require('dotenv').config();
const axios = require('axios');



const getTranslation = async (prompt) => {
    const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
          'to[0]': 'en',
          'api-version': '3.0',
          profanityAction: 'NoAction',
          textType: 'plain'
        },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        data: [
          {
            Text: prompt
          }
        ]
    };
try {
	const response = await axios.request(options);
	return response.data[0].translations[0].text;
} catch (error) {
	throw new Error("Error occurred while translating text");
}
}

module.exports = getTranslation;