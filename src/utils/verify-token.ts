import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

type TokenPayload = {
    exp: number
    [key: string]: any // caso tenha mais dados no payload
}

/**
 * Verifica se o token existe nos cookies e se é válido e não expirado
 * @returns boolean - true if the token is valid, false otherwise
 */
export function verifyToken(): boolean {
    const token = Cookies.get('exec.token')
    if (!token) {
        return false
    }

    try {
        const decoded: TokenPayload = jwtDecode(token)

        // Verifica se o campo 'exp' existe
        if (!decoded.exp) {
            return false;
        }

        const now = Math.floor(Date.now() / 1000) // tempo atual em segundos

        return decoded.exp > now // verifica se o token não está expirado
    } catch (error) {
        console.error("Erro ao decodificar token:", error)
        return false
    }
}