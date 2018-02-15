import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import conf from '../config'

const secret = conf.authSecret

const authenticate = expressJwt({ secret })

const generateAccessToken = (req, res, next) => {
  req.token = jwt.sign({
    id: req.user.id
  }, secret);
  next()
}

const respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
    scope: req.user.scope,
    id: req.user.id
  })
}

export { authenticate, generateAccessToken, respond }
