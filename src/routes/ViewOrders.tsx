import { LogOut } from "lucide-react";
import { Button } from "../components/Button";
import { Order } from "../components/Order";
import { Container, Header } from "../styles/ViewOrders.styles";

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
        <form className="filter">
          <Button>EM ATENDIMENTO</Button>
          <Button>AGUARDANDO</Button>
        </form>

        <div className="list-orders">
          <Order />
        </div>
      </div>
    </Container>
  )
}
