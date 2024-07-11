import { Link } from "react-router-dom";
import { HeaderContainer, ImageBanner, Logo } from "./styles";
import { Book, BookKey, BookOpen, BookOpenCheck, Eye } from "lucide-react";

export function Header() {
  return (
    <HeaderContainer>
      {/* <Logo> */}
      <img src="/Log_Fortaleza_sem_fundo.png" alt="Logo horizontal" width={150} />
      {/* </Logo> */}
      <nav>
        <ul>

          <Link to="/">
            <li>
              <Book size={20} />
              Abrir Ordem de Serviço
            </li>
          </Link>

          <Link to="/historico">
            <li>
              <Eye size={20} />
              Visualizar histórico
            </li>
          </Link>
        </ul>
      </nav>

      {/* <ImageBanner>
      </ImageBanner> */}
    </HeaderContainer>
  )
}
