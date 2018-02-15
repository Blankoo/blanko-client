import { Router as router } from 'express';
import Account from '../models/account';
import passport from 'passport';
import log from '../log'
import { generateAccessToken, respond, authenticate } from '../middlewares/auth'

export default () => {
  const api = router();

  api.post('/register', (req, res) => {
    Account.register( new Account({
      username: req.body.username
    }), req.body.password, (err) => {

      if(err) {
        res.json({ message: 'This account already excist, try it with another email address.' })
      } else {
        passport.authenticate(
          'local', { session: false }
        )(req, res, () => { res.status(200).json({ message: 'Succesfully created account'}) })
      }
    })
  })

  api.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: true}, (err, user) => {
      log.info(`User with ID: ${user._id} logged in`)
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.json({
          success: false,
          message: 'Wrong username or password.'
        });
      }

      req.login(user, err => err ? res.json(err) : next())

    })(req, res, next)
  }, generateAccessToken, respond)

  api.get('/logout', authenticate, (req, res) => {
    req.logout();
    res.status(200).json({ message: 'You have been logged out' })
  })

  api.get('/me', authenticate, (req, res) => {
    log.info({req})
    res.status(200).json(req.user);
  })

  return api
}
