import { LogOut } from "lucide-react";
import { Container, Header } from "../Styles/ViewOrders.styles";
import { Button } from "../components/Button";

export function ViewOrders() {
  return (
    <Container>
      <Header>
        <img src="./assets/logo_horizontal.svg" alt="Logo São Camilo" />

        <LogOut className="icon" size={26} />
      </Header>

      <div className="wrapper">
        <div className="quantidade">
          <span>Solicitações</span>

          <span>0</span>
        </div>
        <div className="filter">
          <Button>Em atendimento</Button>
          <Button>Aguardando atendimento</Button>
        </div>
      </div>
    </Container>
  )
}
