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
    const { taskId, accountId } = params

    Account.findById({_id: accountId}).then(acc => {
      const thisTask = acc.tasks.find(accountTask => `${accountTask}` === taskId)

      if(thisTask === undefined) {
        log.info('This task ID is not part of this acc')
        res.json({ message: 'This is not a valid task id'})
      } else {
        Task.findByIdAndUpdate(thisTask, body).then(task => {
          log.info({ task })
          res.json({ message: 'updated task', body })
        })
      }
    }).catch(err => {
      res.send(err)
      log.info({ err })
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

  tasks.delete('/:accountId/:taskId', authenticate, (req, res) => {
    const { taskId, accountId } = req.params

    Account.findById({ _id: accountId }).then(acc => {
      const thisTaskId = acc.tasks.find(accountTask => `${accountTask}` === taskId)

      if (thisTaskId !== undefined) {
        Task.findByIdAndRemove(thisTaskId).then(() => {
          res.json({ message: 'Task has been deleted'})
        }).catch(err => {
          res.json(err)
          log.info({ err })
        })
      } else {
        log.info({ message: 'Not a valid task' })
      }
    })
  })

  return tasks
}
