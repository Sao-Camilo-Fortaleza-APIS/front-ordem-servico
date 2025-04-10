import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

/**
 * Cria uma instância do axios com a URL base definida no arquivo .env.local
 *
 * A URL base é definida na variável de ambiente VITE_BASE_URL
 *
 * O arquivo .env.local deve estar na raiz do projeto e deve conter a variável VITE_BASE_URL
 *
 * @example VITE_BASE_URL="http://localhost:3000"
 */
const api = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

/**
 * @description Intercepta a resposta e verifica se o status é 401, caso seja, remove o token e redireciona para a página de login
 */
api.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error instanceof AxiosError && error.response?.status === 401 && error.response.data.message !== 'Usuário ou senha incorretos.') {
			Cookies.remove('exec.token')
			Cookies.remove('user')
			window.location.href = '/entrar'
		}
		return Promise.reject(error)
	},
)

/**
 * @description Intercepta a requisição e adiciona o token de autenticação para enviar ao backend
 */
api.interceptors.request.use(
	config => {
		const token = Cookies.get('exec.token')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error)
	}
);


export default api;