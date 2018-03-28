import { Router as router } from 'express'
import log from '../log'
import BetaReleaseEmail from '../models/betaReleaseEmail'

export default () => {
  const betaReleaseEmails = router()

  betaReleaseEmails.get('/', (request, response) => {
    response.json({
      message: 'You can signup for the beta at blankoapp.com'
    })
  })

  betaReleaseEmails.post('/signup', (request, response) => {
    const { body } = request
    const newBetaSignup = new BetaReleaseEmail(body)
    log.info({ body })
    newBetaSignup.save(err => err ?
      response.json({
        message: 'Error signin up',
        err
      }) :
      response.json({
        message: 'Succesfully sign up for the beta release'
      })
    )
  })

  return betaReleaseEmails
}
