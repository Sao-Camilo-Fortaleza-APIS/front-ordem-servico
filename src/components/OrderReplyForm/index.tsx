import * as Dialog from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Button } from "../Button";
import { Label } from "../Label";
import { FormStyled } from "./styles";


export function OrderReplyForm({ numberOrder }: { numberOrder: number }) {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [historyValue, setHistoryValue] = useState<string>('')
  const navigate = useNavigate()

  let user = Cookies.get('user') ?? ''

  async function handleSendOrderReply(event: any) {
    event.preventDefault()

    try {
      if (user === '') {
        toast.error('Sessão expirada, faça login novamente', {
          position: 'top-center'
        })
        Cookies.remove('exec.token')
        Cookies.remove('user')
        navigate('/entrar')
        return
      } else if (historyValue === '') {
        toast.error('Preencha o histórico', {
          position: 'top-center'
        })
        return
      } else if (selectedOption === '') {
        toast.error('Selecione o tipo de histórico', {
          position: 'top-center'
        })
        return
      } else if (selectedOption === 'retorno') {
        const response = await api.post('/post/history', {
          nr_order: numberOrder,
          nm_user: user,
          history: historyValue
        })

        if (response.status === 201) {
          toast.success('Histórico de retorno enviado!', {
            position: 'top-center'
          })
          return
        }
      } else if (selectedOption === 'solucao') {
        const response = await api.post('/post/approbation', {
          nr_order: numberOrder,
          has_approve: "yes",
          nm_usuario: user,
        })
      }

    } catch (error) {
      console.error(error)
    }
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };
  return (
    <FormStyled onSubmit={handleSendOrderReply}>
      <div>
        <Label htmlFor="reply">Histórico</Label>
        <textarea
          name="reply"
          id="reply"
          cols={30}
          rows={10}
          placeholder="Digite sua resposta"
          value={historyValue}
          onChange={e => setHistoryValue(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="">Tipo de histórico</Label>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: '0.25rem' }}>
          <input
            type="radio"
            name="retorno"
            id="retorno"
            value="retorno"
            checked={selectedOption === 'retorno'}
            onChange={() => handleOptionChange('retorno')}
            style={{ width: '1rem', height: '1rem' }}
          />
          <Label htmlFor="retorno">Retorno</Label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: '0.25rem' }}>
          <input
            disabled
            type="radio"
            name="solucao"
            id="solucao"
            value="solucao"
            checked={selectedOption === 'solucao'}
            onChange={() => handleOptionChange('solucao')}
            style={{ width: '1rem', height: '1rem' }}
          />
          <Label htmlFor="solucao">Solução</Label>
        </div>
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
