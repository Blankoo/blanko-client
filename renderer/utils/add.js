import http from './http'
import conf from './config'

async function add(endpoint, id, obj) {
	try {
		const hasEndpoint = endpoint !== undefined ? `${endpoint}/` : ''
		const hasId = id !== undefined ? `${id}/` : ''
		const finalEndpoint = `${conf.apiUrl}/${hasEndpoint}${hasId}`
		const retrievedData = await http.post(finalEndpoint, obj)
		const { data } = retrievedData
		return { data, retrievedData }
	} catch(err) {
		throw err
	}
}

export default add
