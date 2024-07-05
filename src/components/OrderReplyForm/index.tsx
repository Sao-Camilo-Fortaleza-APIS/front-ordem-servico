import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import api from "../../services/api";
import { verifyToken } from "../../utils/verify-token";
import { Button } from "../Button";
import { FormStyled, SwitchRoot, SwitchThumb } from "./styles";

const schemareplyform = z.object({
  history: z.string().min(3, 'Histórico muito curto'),
  typeHistory: z.string(),
  close: z.boolean()
})
type SchemaReplyForm = z.infer<typeof schemareplyform>


export function OrderReplyForm({ numberOrder }: { numberOrder: number }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { register, handleSubmit, control, resetField, watch, formState: { errors, isSubmitting }, setValue } = useForm<SchemaReplyForm>({
    resolver: zodResolver(schemareplyform),
    defaultValues: {
      typeHistory: 'retorno',
      close: false,
    }
  })

  let user = Cookies.get('user') ?? ''
  let isDisabled: boolean = watch('typeHistory') === 'retorno' ? true : false

  const { mutateAsync } = useMutation({
    mutationFn: async ({ history, typeHistory, close }: SchemaReplyForm) => {
      console.log({ history, typeHistory, close, isDisabled });

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
        await api.post(`/post/history/solution?closed=${close}`, {
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

  async function handleSendOrderReply({ history, typeHistory, close }: SchemaReplyForm) {
    await mutateAsync({ history, typeHistory, close })
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

      {/* Tipos de histórico */}
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

      <div className="switch-item">
        <label htmlFor="close">Encerrar Ordem de Serviço?</label>
        <Controller
          control={control}
          name="close"
          render={({ field }) => (
            <SwitchRoot
              disabled={isDisabled || isSubmitting}
              id="close"
              checked={isDisabled ? false : field.value}
              onCheckedChange={field.onChange}
            >
              <SwitchThumb />
            </SwitchRoot>
          )} />
      </div>

      {/* Texto de histórico */}
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
