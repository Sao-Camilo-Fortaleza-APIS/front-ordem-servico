import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { FormStyled } from "./styles";


export function TakeOrderForm({ numberOrder }: { numberOrder: number }) {
  const navigate = useNavigate()

  let user = Cookies.get('user') ?? ''

  async function handleSendOrderReply(event: any) {
    event.preventDefault()

    try {
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
      <button type="submit">Assumir</button>
      <button type="submit">Fransferir</button>
    </FormStyled>
  )
}
