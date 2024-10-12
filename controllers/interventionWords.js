const _interventionWords = require('../services/interventionWords');

const getListInterventionWords = async (req, res, next) => {
    try {
        // const { filter, category, name } = req.query;
        // console.log(req.auth)
      
        const data = await _interventionWords.getList();
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }   
}

const getRandomInterventionWords = async (req, res, next) => {
    try {
        const { filter, category, name } = req.query;
        // console.log(req.auth)
      
        const data = await _interventionWords.getRandom({ filter, category, name });
        return res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        next(error);
    }   
}

const getOpenAIInterventionWords = async (req, res, next) => {
    try {
        const { filter, category, name } = req.query;
        const data = await _interventionWords.getOpenAI({ filter, category, name });
        return res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    getRandomInterventionWords,
    getListInterventionWords,
    getOpenAIInterventionWords
};