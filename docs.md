# API endpoints

> Base API url: https://api.blankoapp.com/v1/

## Account
POST — register url: `https://api.blankoapp.com/v1/account/register/`

POST — login url: `https://api.blankoapp.com/v1/account/login/`

GET — me url: `https://api.blankoapp.com/v1/account/me/`

### Account schema
```json
{
  "username" : "your@email.nl",
  "password": "yourpassword"
}
```

## Tasks

GET — get all tasks dedicated to account url: `https://api.blankoapp.com/v1/tasks/[ACCOUNTID]`

GET — get one task dedicated to account url: `https://api.blankoapp.com/v1/tasks/[ACCOUNTID]/[TASKID]`

POST — add task to account url: `https://api.blankoapp.com/v1/tasks/add/[ACCOUNTID]`

PUT — update task from acc url: `https://api.blankoapp.com/v1/tasks/[ACCOUNTID]/[TASKID]`

DELETE — delete task from acc url: `https://api.blankoapp.com/v1/tasks/[ACCOUNTID]/[TASKID]`

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
	"misc": {}
}
```

You can create an account on https://www.blankoapp.com/acctest/
