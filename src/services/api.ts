import axios from 'axios';
import Cookies from 'js-cookie';
import { getUser } from '../hooks/userCookies';

const token = Cookies.get('exec.token');
console.log(token);


const api = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL_HML}`,
});

api.interceptors.request.use(config => {
	const token = Cookies.get('exec.token')
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});


export default api;