import { NavBar } from "../NavBar";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <img className="logo-horizontal" src="/Log_Fortaleza_sem_fundo.png" alt="Logo horizontal" width={150} />
      <img className="logo-vertical" src="/logo_horizontal.png" alt="Logo horizontal" width={150} />
      <NavBar />
    </HeaderContainer>
  )
}
