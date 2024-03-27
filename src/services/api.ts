import axios from 'axios';

/* const token = sessionStorage.getItem('token'); */

const api = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL_HML}`,
});

/* if (token) {
	api.defaults.headers['Authorization'] = `Bearer ${token}`;
} */

export default api;