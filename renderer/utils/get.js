import http from './http'
import conf from './config'

async function get(endpoint, id) {
	try {
		const hasEndpoint = endpoint !== undefined ? `${endpoint}/` : ''
		const hasId = id !== undefined ? `${id}/` : ''
		const finalEndpoint = `${conf.apiUrl}/${hasEndpoint}${hasId}`
		const retrievedData = await http.get(finalEndpoint)
		const { data } = retrievedData
		console.log(data);
		return { data, retrievedData}
	} catch(err) {
		throw err
	}
}

export default get
