import { Router as router } from 'express'
import Promise from 'bluebird'

import log from '../log'
import { authenticate } from '../middlewares/auth'

import Account from '../models/account'
import Project from '../models/projects'
import Task from '../models/tasks'

export default () => {
  const projects = router()

  projects.get('/', (req, res) =>  res.json({ message: 'Projects.' }))
  projects.get('/:accountId', authenticate, (req, res) => {
    const { accountId } = req.params

    Project.find({ createdBy: accountId}).then(projects => {
      log.info('________________PROJECTS_____________')
      log.info({projects})
      res.json(projects)
    })
    .catch(err => {
      res.json({err})
      log.info({err})
    })
  })

  projects.get('/:accountId/:projectId', authenticate, (req, res) => {
    const { projectId } = req.params
    Project.findById(projectId).then(project => {
      log.info({ project })
      res.json(project)
    })
  })

  projects.get('/:accountId/:projectId/tasks', authenticate, (req, res) => {
    const { projectId } = req.params
    Task.find({ projectId }).then(tasks => {
      log.info({ tasks })
      res.json(tasks)
    })
  })

  // add project to account
  projects.post('/add/:accountId', authenticate, (req, res) => {
    const { params, body } = req
    const { accountId } = params
    const newProject = new Project(body)

    Account.findById(accountId).then(account => {
      newProject.createdBy = account._id
      account.projects.push(newProject)
      newProject.save().then(newProject => {
        res.json(newProject)
        account.save()
      }).catch(err => res.json(err))
    }).catch(err => res.json(err))
  })

  // add task to project in account
  projects.post('/add/:accountId/:projectId', authenticate, (req, res) => {
    const { params, body } = req
    const { accountId, projectId } = params
    const newTask = new Task(body)

    Project.findById(projectId).then(project => {
      newTask.projectId = projectId
      project.tasks.push(newTask)

      newTask.save(err => {
        if(err) { return err }
        log.info({ newTask });
        project.save()
        res.json({ message: `Task succesfully saved to acc with id: ${accountId} and project with id: ${projectId}`, body: newTask })
      })
    }).catch(err => res.json(err))
  })

  projects.put('/:accountId/:projectId', authenticate, (req, res) => {
    const { params, body } = req
    const { accountId, projectId } = params

    Project.findByIdAndUpdate(projectId, body)
      .then(project => {
        log.info({ project })
        res.json({ message: 'Project updated'})
      }).catch(err => {
        res.json({ message: 'Something went wrong while updating your project', err})
        log.info({ err })
      })
  })

  projects.delete('/:accountId/:projectId', authenticate, (req, res) => {
    const { accountId, projectId } = req.params

    // Account.findById(accountId).then(account => {
    //   const { projects } = account
    //   projects.remove(projectId)

    //   Account.save()
    //   res.json({ message: 'Removed project from account.' })
    // }).catch(err => res.json(err))

    Project.findByIdAndRemove(projectId).then(() => {
      res.json({ accountId, projectId, message: 'delete ffies dan'})
      Account.update({ projects }, { $pull: projects[projectId] }, { multi: true })
    }).catch(err => err)
  })


  return projects
}
