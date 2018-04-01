# API endpoints

> online API url: https://api.blankoapp.com/v1/

## Account
POST — register:
`https://api.blankoapp.com/v1/account/register/`

POST — login:
`https://api.blankoapp.com/v1/account/login/`

GET – logout user:
`https://api.blankoapp.com/v1/account/logout/`

GET — user info:
`https://api.blankoapp.com/v1/account/me/`

POST — change password:
`https://api.blankoapp.com/v1/account/changepassword/`

POST — forgot password:
`https://api.blankoapp.com/v1/account/forgot/`

POST – reset password:
`https://api.blankoapp.com/v1/account/reset/[TOKEN]`



### Account schema
```json
{
  "username" : "your@email.nl",
  "password": "yourpassword"
}
```

## Project

GET — all projects from account:
`https://api.blankoapp.com/v1/projects/[ACCOUNTID]`

GET — one project from account with project id:
`https://api.blankoapp.com/v1/projects/[ACCOUNTID]/[PROJECTID]`

GET — all tasks in a project:
`https://api.blankoapp.com/v1/projects/[ACCOUNTID]/[PROJECTID]/tasks`

POST — add project to account
`https://api.blankoapp.com/v1/projects/add/[ACCOUNTID]`

POST — add task to project to account:
`https://api.blankoapp.com/v1/projects/add/[ACCOUNTID]/[PROJECTID]`

PUT — update project:
`https://api.blankoapp.com/v1/projects/[ACCOUNTID]/[PROJECTID]`

DELETE — delete project from account:
`https://api.blankoapp.com/v1/projects/[ACCOUNTID]/[PROJECTID]`

## Time measurements
POST — post new time measurement to task:
`http://api.blankoapp.com/v1/timemeasurements/new/[accountId]/[taskId]`

PUT — update time measurement:
`http://api.blankoapp.com/v1/timemeasurements/update/[accountId]/[taskId]/[measurementId]`

GET — get all task related measurements
`http://api.blankoapp.com/v1/timemeasurements/all/[taskId]/`

## Tasks

GET — get all tasks dedicated to account:
`https://api.blankoapp.com/v1/tasks/[ACCOUNTID]`

GET — get one task dedicated to account:
`https://api.blankoapp.com/v1/tasks/[ACCOUNTID]/[TASKID]`

POST — add task to account:
`https://api.blankoapp.com/v1/tasks/add/[ACCOUNTID]`

PUT — update task from acc:
`https://api.blankoapp.com/v1/tasks/[ACCOUNTID]/[TASKID]`

DELETE — delete task from acc:
`https://api.blankoapp.com/v1/tasks/[ACCOUNTID]/[TASKID]`

### Task schema

```json
{
  "title": "Write a litle documentation about blanko API",
  "subTitle": "must include schema's & endpoints",
  "status": "todo",
  "labels": ["documentation"],
  "subTasks": [{
    "title": "List out all end points",
    "subTitle": "",
    "status": "todo"
  }],
  "priorityLevel": 1,
  "timeSpend": 0,
  "misc": {},
}
```

You can create an account on https://www.blankoapp.com/acctest/
