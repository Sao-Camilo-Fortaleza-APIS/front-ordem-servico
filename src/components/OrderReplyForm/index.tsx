import * as Dialog from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Button } from "../Button";
import { FormStyled } from "./styles";


export function OrderReplyForm({ numberOrder }: { numberOrder: number }) {
  const [selectedOption, setSelectedOption] = useState<string>('retorno')
  const [historyValue, setHistoryValue] = useState<string>('')
  const navigate = useNavigate()

  let user = Cookies.get('user') ?? ''

  async function handleSendOrderReply(event?: BaseSyntheticEvent) {
    event?.preventDefault()
    if (selectedOption === 'retorno') {
      await sendHistoryReturn()
    }
    if (selectedOption === 'solucao') {
      await sendHistorySoluction()
    }
  }

  async function sendHistoryReturn() {
    await api.post('/post/history', {
      nr_order: numberOrder,
      nm_user: user,
      history: historyValue
    }).then(response => {
      if (response.status === 201) {
        toast.success('Histórico de retorno enviado!', { position: 'top-center' })
        setHistoryValue('')
      }
    }).catch(error => {
      console.error(error.response)
      if (error.response.status === 401) {
        toast.error('Sessão expirada, faça login novamente', { position: 'top-center' })
        Cookies.remove('exec.token')
        Cookies.remove('user')
        return navigate('/entrar')
      }
      console.error(error)
      toast.error('Erro ao enviar histórico de retorno', { position: 'top-center' })
    }
    )
  }

  async function sendHistorySoluction() {
    await api.post('/post/history/solution', {
      nr_order: numberOrder,
      nm_user: user,
      history: historyValue
    }).then(response => {
      if (response.status === 201) {
        toast.success('Histórico de retorno enviado!', { position: 'top-center' })
        setHistoryValue('')
      }
    }).catch(error => {
      console.error(error.response)
      if (error.response.status === 401) {
        toast.error('Sessão expirada, faça login novamente', { position: 'top-center' })
        Cookies.remove('exec.token')
        Cookies.remove('user')
        return navigate('/entrar')
      }
      console.error(error)
      toast.error('Erro ao enviar histórico de solução', { position: 'top-center' })
    }
    )
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };


  useEffect(() => {
    if (user === '') {
      toast.error('Sessão expirada, faça login novamente', { position: 'top-center' })
      Cookies.remove('exec.token')
      Cookies.remove('user')
      return navigate('/entrar')
    }
  }, [user])

  return (
    <FormStyled onSubmit={handleSendOrderReply}>
      <div className="radio-group">
        <label htmlFor="type">Tipo de histórico</label>
        <div className="radio-item">
          <input
            type="radio"
            name="retorno"
            id="retorno"
            value="retorno"
            checked={selectedOption === 'retorno'}
            onChange={() => handleOptionChange('retorno')}
          />
          <label htmlFor="retorno">Retorno</label>
        </div>
        <div className="radio-item">
          <input
            type="radio"
            name="solucao"
            id="solucao"
            value="solucao"
            checked={selectedOption === 'solucao'}
            onChange={() => handleOptionChange('solucao')}
          />
          <label htmlFor="solucao">Solução</label>
        </div>
      </div>

      <div>
        <label htmlFor="reply">Histórico</label>
        <textarea
          required
          name="reply"
          id="reply"
          cols={30}
          rows={10}
          placeholder="Digite sua resposta"
          value={historyValue}
          onChange={e => setHistoryValue(e.target.value)}
        />
      </div>

      <div className="action-form">
        <Dialog.Close asChild>
          <Button>Cancelar</Button>
        </Dialog.Close>
        <Button variant="reply" type="submit">Enviar</Button>
      </div>
    </FormStyled>
  )
}
