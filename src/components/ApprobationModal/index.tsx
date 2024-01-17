import { Form } from "../../Pages/Formularios/Historico/styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import { Dialog, Trigger, Content } from "../Modal";

type ApprovalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  hasApprove: 'yes' | 'no'
  orderNumber: number
}

export function ApprobationModal(props: ApprovalProps) {
  async function handlePreApprove() {
    alert('Aprovou?')
    // handleApprobation('yes', resultOrderData?.number)
  }
  return (
    <Dialog open={props.open} setOpen={props.setOpen}>
      <Content
        position="center"
        title="Responder Histórico"
        size="sm"
        overlay={true}
        isInteractiveOutside={false}
      >
        <Form className="reply" onSubmit={() => console.log()} style={{ width: '100%' }}>
          <div>
            <Label htmlFor="user-approbation">
              Usuário do Tasy
            </Label>
            <Input
              name="user-approbation"
              type="text"
              placeholder="Ex: nome.sobrenome"
              value={""}
              onChange={() => console.log("teste")}
            />
          </div>
          <div>
            <Label htmlFor="user-approbation">
              Confirmar aprovação?
            </Label>
          </div>
          <div className="action-form">
            <Button>Cancelar</Button>
            <Button type="submit" variant="reply">Sim</Button>
          </div>
        </Form>
      </Content>
      <Trigger asChild>
        <button
          className="check"
        >
          Aprovar
        </button>
      </Trigger>
    </Dialog>
  )
}
