import http from './http'
import conf from './config'

async function put(endpoint, obj) {
	try {
		const hasEndpoint = endpoint !== undefined ? `${endpoint}/` : ''
		// const hasId = id !== undefined ? `${id}/` : ''
		const finalEndpoint = `${conf.apiUrl}/${hasEndpoint}`
		console.log('finalEndpoint:  ', finalEndpoint);
		const retrievedData = await http.put(finalEndpoint, obj)
		const { data } = retrievedData
		console.log('data', data);
		return { data, retrievedData}
	} catch(err) {
		throw err
	}
}

export default put
