import { Router as router } from 'express'
import Task from '../models/tasks'
import Timemeasurement from '../models/timemeasurement'
import log from '../log'
import { authenticate } from '../middlewares/auth'

export default () => {
  const timemeasurements = router()

  timemeasurements.post('/new/:accountId/:taskId', authenticate, function postNewTimeMeasurement(req, res) {
    const { body, params } = req
    const { accountId, taskId } = params

    const newMeasurement = new Timemeasurement(body)
    newMeasurement.createdBy = accountId
    newMeasurement.taskId = taskId

    newMeasurement.save(err => {
      if(err) {
        log.info(err)
        res.json(err)
      } else {
        log.info({ message: 'Succesfully created new time measurement'})
        res.json({ message: 'Succesfully created new time measurement'})
      }
    })
  })

  timemeasurements.put('/update/:accountId/:taskId/:measurementId', authenticate, function updateTimeMeasurement(request, response) {
    const { body, params } = request
    const { accountId, measurementId } = params

    Timemeasurement.findByIdAndUpdate(measurementId, body)
      .then(() => {
        response.json({ message: 'Succesfully updated time measurement' })
      })
  })

  timemeasurements.get('/all/:taskId', authenticate, function getAllTimeMeasurement(request, response) {
    const { params: { taskId }} = request

    Timemeasurement.find({ taskId })
      .then((measurements) => {
        log.info({ measurements })
        response.json({ measurements })
      })
  })

  return timemeasurements
}
