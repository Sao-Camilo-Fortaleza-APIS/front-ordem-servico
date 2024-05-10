import * as Dialog from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Button } from "../Button";
import { FormStyled } from "./styles";


export function TakeOrderForm({ numberOrder }: { numberOrder: number }) {
  const navigate = useNavigate()

  let user = Cookies.get('user') ?? ''

  async function handleSendOrderReply(event: any) {
    event.preventDefault()

    try {
      console.log('enviando resposta');
      if (!user || user === '') {
        Cookies.remove('user')
        Cookies.remove('exec.token')
        navigate('/signin')
      } else if (!numberOrder) {
        toast.error('Número da Ordem de Serviço não encontrado')
        return
      }
      await api.post('/post/takeon', {
        nr_order: numberOrder,
        nm_user: user
      })
      window.location.reload()

      toast.success('Ordem de Serviço assumida')
    } catch (error) {
      toast.error('Erro ao assumir Ordem de Serviço')
      console.error(error)
    }
  }

  return (
    <FormStyled onSubmit={handleSendOrderReply}>
      <div className="content-form">
        <h3>Deseja assumir a Ordem de Serviço?</h3>
        <p>Ordem de Serviço: {numberOrder}</p>
      </div>
      <div className="action-form">
        <Dialog.Close asChild>
          <Button>Não</Button>
        </Dialog.Close>
        <Button variant="reply" type="submit">Sim</Button>
      </div>
    </FormStyled>
  )
}
