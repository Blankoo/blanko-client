import Dexie from 'dexie'

const db = new Dexie('blanko')

db.version(1).stores({
  acc: 'id++, name, email',
	tasks: 'id++, *tasks',
	projects: 'id++, *projects',
	clients: 'id++, *clients'
})

// db.open()

// db.acc.add({
//   name: 'Noud Adrichem',
// 	email: 'info@noudadrichem.com',
// })

/*
TASK SCHEMA
{
	'_id": "5a3166570245aabfbeb7b864",
	"createdBy":"5a306ba40af7d578c56e1c1b",
	"title": "Linked account pleasee",
	"subTitle": "sub titel die wat langer is dan normaal",
	"status": "todo",
	"priorityLevel": 1,
	"timeSpend": 180,
	"subTasks": [{
		"status": "todo",
		"subTitle": "sub titel die wat langer is dan normaal",
		"title": "Eentje met sub tasks"
	}],
	"date":"2017-12-13T17:41:41.550+0000",
	"labels": ["testing"],
	"__v": 0
}
*/

// db.tasks.add({
// 	'_id': '5a3166570245aabfbeb7b864',
// 	'createdBy':'5a306ba40af7d578c56e1c1b',
// 	'title': 'Linked account pleasee',
// 	'subTitle': 'sub titel die wat langer is dan normaal',
// 	'status': 'todo',
// 	'priorityLevel': 1,
// 	'timeSpend': 180,
// 	'subTasks': [{
// 		'status': 'todo',
// 		'subTitle': 'sub titel die wat langer is dan normaal',
// 		'title': 'Eentje met sub tasks'
// 	}],
// 	'date':'2017-12-13T17:41:41.550+0000',
// 	'labels': ['testing'],
// 	'__v': 0
// })

export default db
