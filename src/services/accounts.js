import { Router as router } from 'express';
import Account from '../models/account';
import passport from 'passport';
import { generateAccessToken, respond, authenticate } from '../middlewares/auth'

export default () => {
  const api = router();

  api.post('/register', (req, res) => {
    Account.register( new Account({
      username: req.body.username
    }), req.body.password, err => {
      err ? res.send(err) : passport.authenticate(
        'local', {
          session: false
        })(req, res, () => {
          res.status(200).json({ message: 'succesfully created account'})
        }
      )
    })
  })

  api.post('/login', passport.authenticate('local', { session: true }), generateAccessToken, respond)

  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).json({ message: 'Logged out'})
  })

  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
  })

  return api
}
