import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Check, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import api from "../../services/api";
import { Button } from "../Button";
import { FormStyled } from "./styles";

const schema = z.object({
  history: z.string(),
  typeHistory: z.string().min(1, { message: 'Selecione o tipo de histórico' })
})

type Schema = z.infer<typeof schema>


export function OrderReplyForm({ numberOrder }: { numberOrder: number }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      typeHistory: 'retorno'
    }
  })

  let user = Cookies.get('user') ?? ''

  const { mutateAsync } = useMutation({
    mutationFn: async ({ history, typeHistory }: Schema) => {
      if (typeHistory === 'retorno') {
        await api.post('/post/history/return', {
          nr_order: numberOrder,
          nm_user: user,
          history,
        })
      }
      if (typeHistory === 'solucao') {
        await api.post('/post/history/solution', {
          nr_order: numberOrder,
          nm_user: user,
          history
        })
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['user', 'minhas', user],
      })

      toast.success('Histórico enviado com sucesso!', { position: 'top-center' })
    },
  })

  async function handleSendOrderReply({ history, typeHistory }: Schema) {
    await mutateAsync({ history, typeHistory })
  }

  /*
  async function sendHistoryReturn() {
    await api.post('/post/history/return', {
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
  } */

  /* const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  }; */


  useEffect(() => {
    if (user === '') {
      toast.error('Sessão expirada, faça login novamente', { position: 'top-center' })
      Cookies.remove('exec.token')
      Cookies.remove('user')
      return navigate('/entrar')
    }
  }, [user])

  return (
    <FormStyled onSubmit={handleSubmit(handleSendOrderReply)}>
      <div className="radio-group">
        <label htmlFor="type">Tipo de histórico</label>

        <div className="radio-item">
          <input
            type="radio"
            value="retorno"
            id="retorno"
            {...register('typeHistory')}
            name="retorno"
          />
          <label htmlFor="retorno">Retorno</label>
        </div>

        <div className="radio-item">
          <input
            type="radio"
            value="solucao"
            id="solucao"
            {...register('typeHistory')}
            name="solucao"
          />
          <label htmlFor="solucao">Solução</label>
        </div>

        {errors.typeHistory?.message && <span>{errors.typeHistory.message}</span>}
      </div>

      <div>
        <label htmlFor="reply">Histórico</label>
        <textarea
          {...register('history')}
          required
          name="reply"
          id="reply"
          cols={30}
          rows={10}
          placeholder="Digite sua resposta"
        />

        {errors.history?.message && <span>{errors.history.message}</span>}
      </div>

      <div className="action-form">
        <Dialog.Close asChild>
          <Button>Cancelar</Button>
        </Dialog.Close>
        <Button disabled={isSubmitting} className="bg-teal-400 text-teal-950" type="submit" variant="reply">
          {isSubmitting ? <Loader2 size={18} /> : <Check size={18} />}
          Save
        </Button>
      </div>
    </FormStyled>
  )
}
