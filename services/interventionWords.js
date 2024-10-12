const {personalizeMessage} = require('../utils/helper')
const {SAD, ANGRY, FEAR, DISGUST} = require('../utils/interventionWords')
const { readPromptFile, getOpenAIResponse } = require('../utils/openAI');

const getList = async () => {
  const data = {
    Sad: SAD,
    Angry: ANGRY,
    Fear: FEAR,
    Disgust: DISGUST,
  }

  if (!data) {
    throw new Error('Error fetching data.')
  }

  return data
}
const getRandom = async ({filter, category, name}) => {
  if (!filter || !category) {
    throw new Error('Missing parameters: filter and category are required.')
  }
  const interventionWords = {
    sad: SAD,
    angry: ANGRY,
    fear: FEAR,
    disgust: DISGUST,
  }

  const emotionData = interventionWords[filter.toLowerCase()]
  if (!emotionData) {
    throw new Error('Emotion category not found.')
    // res.status(404).json({ error: "Emotion category not found." });
  }

  const words = emotionData[category]
  if (!words) {
    throw new Error('Category not found within the specified emotion.')
  }

  const allWords = [
    ...words['attention'],
    ...words['relevance'],
    ...words['confidence'],
    ...words['satisfaction'],
  ]

  const randomIndex = Math.floor(Math.random() * allWords.length)
  const randomWord = allWords[randomIndex]

  if (randomWord.includes('[nama]')) {
    return personalizeMessage(name, randomWord)
  }

  return randomWord
}

const getOpenAI = async ({ filter, category, name}) => {
  if (!filter || !category) {
    throw new Error('missing parameters: filter and category are required.')
  }

  const prompt = await readPromptFile();
  const openAIResponse = await getOpenAIResponse(filter, category, name, prompt);

  if (openAIResponse.includes('[name]')) {
      return personalizeMessage(name, openAIResponse);
   }

  return openAIResponse;
};

module.exports = {
  getList,
  getRandom,
  getOpenAI
}
