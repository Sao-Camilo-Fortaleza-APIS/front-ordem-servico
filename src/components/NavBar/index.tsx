import { useLocation } from "react-router-dom";
import { NavItem, NavbarContainer } from "./styles";

export function Navbar() {
    const location = useLocation();

    return (
        <NavbarContainer>
            <NavItem to="/" active={location.pathname === '/'}>Abrir Ordem de Serviço</NavItem>
            <NavItem to="/historico" active={location.pathname === '/historico'}>Visualizar histórico de Ordem</NavItem>
        </NavbarContainer>
    );
}
