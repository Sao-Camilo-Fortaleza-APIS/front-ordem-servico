import { NavBar } from "../NavBar";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <img className="logo-horizontal" src="/assets/logo_horizontal.png" alt="Logo horizontal" width={150} />
      <img className="logo-vertical" src="/assets/petala_cruz.png" alt="Logo horizontal" width={56} />
      <NavBar />
    </HeaderContainer>
  )
}
