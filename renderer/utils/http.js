import axios from 'axios'
import conf from './config'
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('USER_TOK') // eslint-disable-line no-undef
	if(token) {
		config.headers.authorization = `Bearer ${token}`
	}
	return config;
}, error => {
	throw error
});

export default axiosInstance;
