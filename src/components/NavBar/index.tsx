import { Link } from "react-router-dom";
import { StyledNavList, StyledNavBar } from "./styles";

export function NavBar() {
    return (
        <StyledNavBar>
            <StyledNavList>
                <li>
                    <Link to={'/'}>
                        <span>Abertura de Ordem de Serviço</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/pesquisa'}>
                        <span>Pesquisar Ordem de Serviço</span>
                    </Link>
                </li>
            </StyledNavList>
        </StyledNavBar>
    );
}
