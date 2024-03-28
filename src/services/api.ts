import axios from 'axios';
import Cookies from 'js-cookie';
import { getUser } from '../hooks/userCookies';

const token = getUser()
console.log(token);


const api = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL_HML}`,
});

if (token) {
	api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default api;