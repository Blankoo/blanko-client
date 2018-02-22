import http from './http'
import conf from './config'

async function del(endpoint) {
	const finalEndpoint = `${conf.apiUrl}/${endpoint}`
	const retrievedData = await http.delete(finalEndpoint)
	const { data } = retrievedData
	return { data, retrievedData }
}

export default del
