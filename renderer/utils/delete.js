import db from './db'

export default (table, id) => {
	db[table].delete(id)
}
