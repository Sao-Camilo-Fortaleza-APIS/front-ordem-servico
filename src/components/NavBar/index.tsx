import { Book, Eye } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavItem, NavbarContainer } from "./styles";

export function Navbar() {
    const location = useLocation();

    return (
        <NavbarContainer>
            <NavItem to="/" active={(location.pathname === '/').toString()}>
                <Book size={20} />
                Abrir Ordem de Serviço
            </NavItem>
            <NavItem to="/historico" active={(location.pathname === '/historico').toString()}>
                <Eye size={20} />
                Visualizar histórico
            </NavItem>
        </NavbarContainer>
    );
}
