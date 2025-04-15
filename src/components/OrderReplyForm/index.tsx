import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Loader, SendHorizonal } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import api from "../../services/api";
import { verifyToken } from "../../utils/verify-token";
import { Button } from "../Button";
import { MoreActionsMenu } from "../MoreActions";
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

  const { register, handleSubmit, control, resetField, watch, formState: { errors, isSubmitting } } = useForm<SchemaReplyForm>({
    resolver: zodResolver(schemareplyform),
    defaultValues: {
      typeHistory: 'retorno',
      close: false,
    }
  })

  const user = Cookies.get('user') ?? ''
  const isDisabled = watch('typeHistory') === 'retorno'

  const { mutateAsync } = useMutation({
    mutationFn: async ({ history, typeHistory, close }: SchemaReplyForm) => {
      const verify = verifyToken()
      if (!verify) {
        throw new Error("Erro", { cause: 'TokenExpired' })
      }

      if (typeHistory === 'retorno') {
        await api.post('/post/history/return', { nr_order: numberOrder, nm_user: user, history })
      }
      if (typeHistory === 'solucao') {
        await api.post(`/post/history/solution?closed=${close}`, { nr_order: numberOrder, nm_user: user, history })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'minhas', user], })
      resetField('history')

      toast.success('Histórico enviado!')
      setTimeout(() => {
        return navigate(-1)
      }, 1000)
    },
    onError: (error) => {
      if (error instanceof Error && error.cause === 'TokenExpired') {
        toast.error('Sessão expirada, faça login novamente!')
        Cookies.remove('exec.token')
        Cookies.remove('user')
        queryClient.clear()
        return navigate('/entrar')
      }
      toast.error(error?.message || "Erro ao enviar histórico")
    },
  })

  async function handleSendOrderReply({ history, typeHistory, close }: SchemaReplyForm) {
    await mutateAsync({ history, typeHistory, close })
  }

  /*   useEffect(() => {
      if (user === '') {
        toast.error('Sessão expirada, faça login novamente!')
        return
      }
    }, [user]) */

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

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
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
        {/* Adicionar opções */}
        <MoreActionsMenu
          numberOrder={numberOrder}
        />
      </div>

      {/* Texto de histórico */}
      {errors.history?.message && <span style={{ color: '#ef4444' }}>{errors.history.message}</span>}
      <div className="comment-container">
        <textarea
          {...register('history')}
          disabled={isSubmitting}
          required
          id="reply"
          cols={30}
          rows={6}
          placeholder="Digite sua resposta..."
        />
        <Button variant="reply" disabled={isSubmitting} type="submit">
          {isSubmitting ? <Loader className="animate-spin" size={20} /> : <SendHorizonal size={20} />}
        </Button>

      </div>
    </FormStyled>
  )
}
