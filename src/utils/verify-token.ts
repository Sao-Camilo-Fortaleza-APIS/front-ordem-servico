import Cookies from "js-cookie";
import { JwtHeader, JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

/**
 * Função que verifica se o token existe e redireciona para a página de login caso não exista um token válido
 */
export function verifyToken() {
  const navigate = useNavigate()
  const token = Cookies.get('access_token')

  if (!token) {
    return navigate('/entrar')
  }

  const { exp } = jwtDecode<JwtPayload>(token)



}