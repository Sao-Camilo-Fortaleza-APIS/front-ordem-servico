import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import api from "../../services/api";
import { Button } from "../Button";
import { FormStyled } from "./styles";

const schemareplyform = z.object({
  history: z.string().min(3, 'Histórico muito curto'),
  typeHistory: z.string()
})
type SchemaReplyForm = z.infer<typeof schemareplyform>


export function OrderReplyForm({ numberOrder }: { numberOrder: number }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { register, handleSubmit, resetField, formState: { errors, isSubmitting } } = useForm<SchemaReplyForm>({
    resolver: zodResolver(schemareplyform),
    defaultValues: {
      typeHistory: 'retorno'
    }
  })

  let user = Cookies.get('user') ?? ''

  const { mutateAsync } = useMutation({
    mutationFn: async ({ history, typeHistory }: SchemaReplyForm) => {
      if (typeHistory === 'retorno') {
        const response = await api.post('/post/history/return', {
          nr_order: numberOrder,
          nm_user: user,
          history,
        })
        if (response.status === 401) {
          toast.error('Sessão expirada, faça login novamente', { position: 'top-center' })
          Cookies.remove('exec.token')
          Cookies.remove('user')
          return navigate('/entrar')
        }

        //toast.error('Erro ao enviar histórico de retorno', { position: 'top-center' })

      }
      if (typeHistory === 'solucao') {
        await api.post('/post/history/solution', {
          nr_order: numberOrder,
          nm_user: user,
          history
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
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'minhas', user],
      })
      resetField('history')

      toast.success(`Histórico enviado!`, { position: 'top-center' })
    },
    onError: () => {
      toast.error('Erro ao enviar histórico de retorno', { position: 'top-center' })
    },
  })

  async function handleSendOrderReply({ history, typeHistory }: SchemaReplyForm) {
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
    }
  
    const handleOptionChange = (value: string) => {
      setSelectedOption(value);
    };
   */

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
            {...register('typeHistory')}
            value='retorno'
            id="retorno"
            type="radio"
            disabled={isSubmitting}
          />
          <label htmlFor="retorno">Retorno</label>
        </div>

        <div className="radio-item">
          <input
            {...register('typeHistory')}
            value="solucao"
            id="solucao"
            type="radio"
            disabled={isSubmitting}
          />
          <label htmlFor="solucao">Solução</label>
        </div>

        {errors.typeHistory?.message && <span style={{ color: '#ef4444' }}>{errors.typeHistory.message}</span>}
      </div>

      <div>
        <label htmlFor="reply">Histórico</label>
        <textarea
          {...register('history')}
          disabled={isSubmitting}
          required
          id="reply"
          cols={30}
          rows={10}
          placeholder="Digite sua resposta"
        />

        {errors.history?.message && <span style={{ color: '#ef4444' }}>{errors.history.message}</span>}
      </div>

      <div className="action-form">
        <Dialog.Close asChild>
          <Button disabled={isSubmitting}>Cancelar</Button>
        </Dialog.Close>

        <Button variant="reply" disabled={isSubmitting} type="submit">
          {isSubmitting ? ' Enviando...' : ' Enviar'}
        </Button>
      </div>
    </FormStyled>
  )
}
