import http from './http'
import conf from './config'

async function put(endpoint, obj) {
	try {
		const hasEndpoint = endpoint !== undefined ? `${endpoint}/` : ''
		const finalEndpoint = `${conf.apiUrl}/${hasEndpoint}`
		const retrievedData = await http.put(finalEndpoint, obj)
		const { data } = retrievedData
		return { data, retrievedData}
	} catch(err) {
		throw err
	}
}

export default put
