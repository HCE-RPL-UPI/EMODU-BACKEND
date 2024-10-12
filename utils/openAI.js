const OpenAI = require('openai');
const fs = require('fs').promises;

const readPromptFile = async () => {
  try {
    const data = await fs.readFile('./utils/openAIPromptSetup.txt', 'utf-8');
    return data;
  } catch (err) {
    throw new Error('error reading prompt file: ' + err.message);
  }
};

const getOpenAIResponse = async (filter, category, name, prompt) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const fullPrompt = `${prompt}\nEmotion: ${filter}\nCategory: ${category}\nName: ${name}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: fullPrompt }],
      max_tokens: 150,
      temperature: 0.7,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    throw new Error('error generating response from OpenAI: ' + error.message);
  }
};

module.exports = {
  readPromptFile,
  getOpenAIResponse,
};
