import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

/**
 * Verify if the token exists in the cookies and if it is valid and not expired
 * @returns boolean - true if the token is valid, false otherwise
 */
export function verifyToken() {
    const token = Cookies.get('exec.token')
    if (!token) {
        return false
    }
    const decoded = jwtDecode(token)
    if (decoded && decoded.exp) {
        const now = Date.now().valueOf() / 1000
        if (decoded.exp < now) {
            return false
        }
        return true
    }
    return false
}