import { Router as router } from 'express';
import Account from '../models/account';
import Task from '../models/tasks';
import passport from 'passport';
import log from '../log'
import { generateAccessToken, respond, authenticate } from '../middlewares/auth'
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import config from '../config'
import Promise from 'bluebird'

export default () => {
  const api = router();

  api.post('/register', (req, res) => {
    const { username, firstName, lastName } = req.body
    const fullName = `${firstName} ${lastName}`

    Account.register( new Account({
      username,
      firstName,
      lastName,
      fullName
    }), req.body.password, (err) => {

      if(err) {
        res.json({ message: 'This account already exist, try resetting the password.' })
      } else {
        passport.authenticate(
          'local', { session: false }
        )(req, res, () => { res.status(200).json({ message: 'Succesfully created account'}) })
      }
    })
  })

  api.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: true}, (err, user) => {
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
    res.status(200).json(req.user);
  })

  api.post('/changepassword', authenticate, (req, res) => {
    const { newPassword, username } = req.body

    Account.findByUsername(username).then((userObject) => {
      if (userObject) {
        userObject.setPassword(newPassword, () => {
          userObject.save()
          res.status(200).json({message: 'password reset successful'})
        })
      } else {
        res.status(500).json({ message: 'This user does not exist' })
      }
    }).catch(err => res.json(err))
  })

  api.post('/forgot', (req, res) => {
    const { username } = req.body
    const hexCodeOnUrl = crypto.randomBytes(Math.ceil(20)).toString('hex')

    Account.findOne({ username }).then(acc => {
      if(!acc) {
        res.json({ message: 'This account does not exist'})
      } else {

        acc.resetPasswordToken = hexCodeOnUrl
        acc.resetPasswordExpires = Date.now() + (3600 * 1000)
        acc.save()

        const { resetPasswordToken } = acc
        const output = `
          <h3>Hey ${acc.fullName},</h3>

          <p>Reset blanko passwordt</p>
          <a href="http://blankoapp.com/reset?tok=${resetPasswordToken}">https://blankoapp.com/reset/</a>`

        const blankoMailSmtp = nodemailer.createTransport({
          host: 'smtp.blankoapp.com',
          port: 587,
          secure: false,
          auth: {
            user: config.email,
            pass: config.emailPassword
          },
          tls: {
            rejectUnauthorized: false
          }
        })

        const mailOptions = {
          from: 'noreply@blankoapp.com',
          to: username,
          subject: 'Reset blanko password',
          html: output
        }

        blankoMailSmtp.sendMail(mailOptions, (err) => {
          if (err) {
            res.json(err)
          } else {
            log.info({ tok: resetPasswordToken })
            log.info({ message: 'Mail has been send!'})
            res.json({ message: 'Mail has been send!'})
          }
        })
      }
    })
  })

  api.post('/reset/:token', (req, res) => {
    const { token } = req.params
    const { newPasswordValue } = req.body

    Account.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    }).then(acc => {
      if(!acc) {
        res.json({ message: 'This URL might be out of date, try it again.', succes: false })
      } else {
        acc.setPassword(newPasswordValue, err => {
          if(err) {
            res.json({ err, succes: false })
          } else {
            acc.resetPasswordToken = undefined
            acc.resetPasswordExpires = undefined

            acc.save()
            res.json({ message: 'Succesfully changed password', succes: true })
          }
        })
      }
    })
  })

  api.get('/all-tasks/:accountId', (req, res) => {
    Task.find({ createdBy: req.params.accountId })
      .then(function returnAllAccountTasks(allAccountTasks) {
        log.info({ allAccountTasks })
        res.json(allAccountTasks)
      })
  })

  return api
}
