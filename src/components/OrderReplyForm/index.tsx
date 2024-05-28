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
import { verifyToken } from "../../utils/verify-token";
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
      await new Promise(resolve => {
        setTimeout(resolve, 1000)
        const verify = verifyToken()
        if (!verify) {
          Cookies.remove('exec.token')
          Cookies.remove('user')

          throw new Error("Erro ao enviar histórico", { cause: 'Sessão expirada, faça login novamente' })
        }
      })

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'minhas', user],
      })
      resetField('history')

      toast.success(`Histórico enviado!`, { position: 'top-center' })
    },
    onError: (error) => {
      toast.error(`${error.message}`, { position: 'top-center' })
    },
  })

  async function handleSendOrderReply({ history, typeHistory }: SchemaReplyForm) {
    await mutateAsync({ history, typeHistory })
  }

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
