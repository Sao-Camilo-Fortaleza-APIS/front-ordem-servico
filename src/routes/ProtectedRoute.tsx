import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyToken } from "../utils/verify-token";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    toast.dismiss()
    const user = Cookies.get('user') ?? ''

    const tokenIsValid = verifyToken()

    if (!user || !tokenIsValid) {
        Cookies.remove('exec.token')
        Cookies.remove('user')

        console.info("Redirecionando: usuário ausente ou token inválido");

        toast.error("Sessão expirada, faça login novamente!")

        return <Navigate to="/entrar" replace />
    }

    return children
}