const jwt = require('jsonwebtoken')
let JWT_SECRET = 'use-this-or-gen-new-secret'
if(process.env.JWT_SECRET){
  JWT_SECRET = process.env.JWT_SECRET
}
const jwtSecret = JWT_SECRET

const UserController = {}

UserController.create = (req, res) => {
  const User = req.app.models.User

  User.create(req.body)
  .then((user) => {
    const token = jwt.sign({
      email: user.email,
      id: user.id
    }, jwtSecret)

    return res.status(201).json({
      user: user,
      auth: {
        id: token,
        userId: user.id
      }
    })
  })
  .catch((err) => {
    return res.status(500).json({
      error: err
    })
  })
}

UserController.update = (req, res) => {
  const User = req.app.models.User

  User.update(req.body, {
    where: {
      id: req.user.id
    }
  })
  .then((user) => {
    return res.status(200).json({
      user: user
    })
  })
  .catch((err) => {
    return res.status(500).json(err)
  })
}

UserController.find = (req, res) => {
  const User = req.app.models.User

  let query = {}
  let params = req.query

  if (params.limit) {
    query.limit = params.limit
  }

  if (params.offset) {
    query.offset = params.offset
  }

  User.findAll(query)
  .then((users) => {
    return res.status(201).json({
      users: users
    })
  })
  .catch((err) => {
    return res.status(500).json({
      error: err
    })
  })
}

UserController.findById = (req, res) => {
  const User = req.app.models.User

  User.findById(req.params.id)
  .then((user) => {
    return res.status(200).json({
      user: user
    })
  })
  .catch((err) => {
    return res.status(500).json(err)
  })
}

UserController.destroy = (req, res) => {
  const User = req.app.models.User
  User.destroy({
    where: {
      id: req.user.id
    }
  })
  .then((user) => {
    return res.status(200).json({
      deleted: user
    })
  })
  .catch((err) => {
    return res.status(500).json(err)
  })
}

module.exports = UserController
