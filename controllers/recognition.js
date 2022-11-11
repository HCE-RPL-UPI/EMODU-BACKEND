const recognition = require('../services/recognition')

const get = async (req, res, next) => {
  try {
    const data = await recognition.get(req.params.id, req.query.limit)
    if (!data) {
      return res.status(404).send({ message: 'Data not found!' })
    }
    return res.status(200).send({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const data = await recognition.getById(
      req.params.id,
      req.params.userId,
      req.query.limit
    )
    if (!data) {
      return res.status(404).send({ message: 'Data not found!' })
    }
    return res.status(200).send({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const getOverview = async (req, res, next) => {
  try {
    const {
      'https://api-fer-graphql.fly.dev/role': role,
      'https://api-fer-graphql.fly.dev/id': createdBy,
    } = req.auth.payload
    const data = await recognition.getOverview(role, createdBy)
    if (!data?.datas?.length) {
      return res.status(404).send({ message: 'Data not found!' })
    }
    return res.status(200).send({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const getSummary = async (req, res, next) => {
  try {
    const {
      'https://api-fer-graphql.fly.dev/role': role,
      'https://api-fer-graphql.fly.dev/id': createdBy,
    } = req.auth.payload
    const data = await recognition.getSummary(role, createdBy)
    if (!data?.datas?.length) {
      return res.status(404).send({ message: 'Data not found!' })
    }
    return res.status(200).send({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { sub: userId } = req.auth.payload
    const { meetingId, image, ...rest } = req.body
    const data = await recognition.create(userId, meetingId, image, rest)
    if (!data) {
      return res.status(404).send({ message: "Data can't be saved!" })
    }
    return res.status(201).send({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const data = await recognition.update(
      req.params.id,
      req.body.isStart,
      req.body.meetingId
    )
    if (!data) {
      return res.status(404).send({ message: "Data can't be saved!" })
    }
    return res.status(200).send({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const data = await recognition.remove(req.params.id)
    if (!data) {
      return res.status(404).send({ message: 'Data not found!' })
    }
    return res.status(200).send({ data })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {
  get,
  getById,
  getOverview,
  getSummary,
  create,
  update,
  remove,
}
