import { Router as router } from 'express'
import Task from '../models/tasks'
import log from '../log'
import { authenticate } from '../middlewares/auth'
import Account from '../models/account'
import Project from '../models/projects'

export default () => {
  const tasks = router()

  tasks.get('/', (req, res) => res.json({ message: 'Make an account first'}))
  tasks.get('/:accountId', authenticate, (req, res) => {
    const { accountId } = req.params

    Task.find({ createdBy: accountId }).then(tasks => {
      res.json(tasks)
      log.info({ tasks })
    }).catch(err => res.send(err))
  })

  tasks.get('/:accountId/:taskId', (req, res) => {
    const { params } = req
    const { accountId, taskId } = params

    Task.findById(taskId).then(singleTask => {
      res.json(singleTask)
      log.info({ singleTask })
    }).catch(err => res.send(err))
  })

  tasks.post('/add', (req, res) => res.json({ message: 'To what account do you want to add this task :P'}))
  tasks.post('/add/:accountId', authenticate, (req, res) => {
    const { params, body } = req
    const { accountId } = params
    const newTask = new Task(body)

    Account.findById({ _id: accountId }).then(account => {
      newTask.createdBy = account._id
      account.tasks.push(newTask)
      newTask.save(err => {
        if(err) { return err }
        log.info({ newTask });
        account.save()
        res.json({ message: `Task succesfully saved to acc with id: ${account._id}`, body: newTask })
      })
    }).catch(err => {
      res.json(err)
      log.info({ err })
    })
  })

  tasks.put('/a/:accountId/:taskId', authenticate, (req, res) => {
    const { params, body } = req
    const { taskId } = params

    Task.findByIdAndUpdate(taskId, body).then(task => {
      log.info({ task })
      res.json({ message: 'updated task' })
    })
  })

  tasks.put('/:projectId/:taskId', authenticate, (req, res) => {
    const { params, body } = req
    const { taskId, projectId } = params

    Project.findById({_id: projectId}).then(project => {
      const thisTask = project.tasks.find(projectTask => `${projectTask}` === taskId)

      if(thisTask === undefined) {
        log.info('This task ID is not part of this acc')
        res.json({ message: 'This is not a valid task id'})
      } else {
        Task.findByIdAndUpdate(thisTask, body).then(task => {
          log.info({ task })
          res.json({ message: 'updated task' })
        })
      }
    }).catch(err => {
      res.send(err)
      log.info({ err })
    })
  })

  tasks.delete('/:accountId/:projectId/:taskId', authenticate, (req, res) => {
    const { taskId, projectId, accountId } = req.params

    Task.findByIdAndRemove(taskId).then(() => {
      res.json({ message: 'Task has been deleted'})
    }).catch(err => {
      res.json(err)
      log.info({ err })
    })
  })

  // add sub tasks
  tasks.put('/sub/:accountId/:projectId/:taskId', authenticate, (req, res) => {
    const { accountId, projectId, taskId } = req.params
    const { title } = req.body
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const uniqueTimeStampId = () => timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase()

    Task.findByIdAndUpdate(taskId, {
      $push: {
        subTasks: {
          id: uniqueTimeStampId(),
          title,
          status: 'todo'
        }
      }
    }).then(() => {
      log.info({ message: 'Sub task added succesfully!'})
      res.json({ message: 'Sub task added succesfully!'})
    }).catch(err => res.json(err))
  })

  // delete subtask
  tasks.put('/delsub/:accountId/:projectId/:taskId/:subTaskId', authenticate, (req, res) => {
    const { taskId, subTaskId } = req.params
    log.info({ taskId })
    log.info({ subTaskId })

    Task.findByIdAndUpdate(taskId, {
      $pull: {
        subTasks: { id: subTaskId }
      }
    }).then(() => {
      log.info({ message: 'Sub task deleted succesfully'})
      res.json({ message: 'Sub task deleted succesfully'})
    }).catch(err => res.json(err))
  })

  tasks.put('/updatesub/:accountId/:projectId/:taskId/:subTaskId', authenticate, (req, res) => {
    const { taskId, subTaskId } = req.params
    const { status } = req.body
    Task.update({ 'subTasks.id': subTaskId }, {
      'subTasks.$.status': status
    }).then(() => {
      log.info({ message: 'Task status updated succesfully' })
      res.json({ message: 'Task status updated succesfully' })
    }).catch(err => res.json({ message: 'There has been an error!', err }))
  })

  tasks.put('/newtimemeasurement/:accountId/:projectId/:taskId', (req, res) => {
    const { taskId } = req.params
    const { startTime, endTime, isPosted } = req.body
    const total = (endTime - startTime)
    const bodyToSave = {
      startTime,
      endTime,
      total,
      isPosted
    }

    Task.findByIdAndUpdate(taskId, {
      $push: {
        measurements: bodyToSave
      }
    })
    .then((task) => {
      const x = task.measurements.slice().pop()
      log.info({ message: 'succesfully added new time measurement!'})
      res.json({ message: 'succesfully added new time measurement!', measurement: x})
    })
    .catch(err => res.json({ message: 'There has been an error adding the time measurement!', err }))
  })

  tasks.put('/updatetimemeasurement/:accountId/:projectId/:taskId/:measurementId', (req, res) => {
    const { taskId, measurementId } = req.params
    const { body } = req
    log.info({ body })
    Task.updateOne({
      measurements: {
        _id: measurementId
      }
    }, {
      $set: {
        'measurements.$': { endTime: body.endTime, isPosted: body.isPosted}
      }
    }).then(() => {
      res.json({
        message: 'Succesfully updated time measurement!'
      })
    }).catch(err => res.json({ message: 'There has been an error!', err }))
  })

  tasks.get('/alltimemeasurements/:accountId/:projectId/:taskId', (req, res) => {
    const { taskId } = req.params
    Task.findById(taskId).then(task => {
      const totalTime = task.measurements.reduce((accum, measurement) => accum + measurement.total, 0)

      log.info({ totalTime })

      res.json({
        message: 'succesfully calculated total time from measurements.',
        total: totalTime
      })
    })
  })

  return tasks
}
