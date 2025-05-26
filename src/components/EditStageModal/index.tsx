import * as Dialog from '@radix-ui/react-dialog';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistoryData } from '../../hooks/useHistoryData';
import api from '../../services/api';
import { ButtonRow, CloseButton, Content, DivColumn, DivRow, Label, Overlay, Title } from '../Report/styles';
import { Button, Select } from '../TransferOrderModal/styles';

interface EditStageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  numberOrder: number
}

interface Stage {
  ds_estagio: string
  nr_sequencia: number
}

export function EditStageModal({ open, onOpenChange, numberOrder }: EditStageModalProps) {
  const { getHistory } = useHistoryData()
  const navigate = useNavigate()
  const [allStages, setAllStages] = useState<Stage[]>([])
  const [selectedStage, setSelectedStage] = useState<string>("")

  const userLogged = Cookies.get('user')

  const handleEditStage = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()

    if (!userLogged) {
      toast.error('Sessão expirada, faça login novamente')
      Cookies.remove('user')
      Cookies.remove('exec.token')
      return navigate('/entrar')
    }
    if (!numberOrder) {
      toast.info('Número da Ordem de Serviço não encontrado')
      return
    }

    if (selectedStage === "") {
      return toast.info('Selecione um estágio')
    }

    console.log(selectedStage, numberOrder, userLogged)

    const loadingToast = toast.loading('Alterando Estágio...')
    try {
      await api.post('/post/alter/internship', {
        nr_order: numberOrder,
        cd_internship: selectedStage,
        user: userLogged
      })

      getHistory(numberOrder.toString())

      toast.update(loadingToast, {
        render: 'Estágio alterado!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      })

      onOpenChange(false)
      setSelectedStage("")
    } catch (error) {
      toast.update(loadingToast, {
        render: `${(error as any)?.response?.data?.message || "Erro ao alterar estágio"}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      })
      return
    }

  }

  const isDisabled = selectedStage === ""

  useEffect(() => {
    setSelectedStage("")
    if (open) {
      api.get('/get/internship')
        .then(response => setAllStages(response.data))

        .catch(error => toast.error(`${error.response.data.message}`))
    }
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>

        <Overlay />
        <Content>
          <CloseButton asChild title="Fechar">
            <X size={20} className="close" aria-label="Fechar" style={{ cursor: "pointer" }} />
          </CloseButton>
          <Title>Alterar Estágio da Ordem de Serviço</Title>
          <DivRow>
            <DivColumn>
              <Label htmlFor="new-stage">Selecione o novo estágio</Label>
              <Select id="group" onChange={e => setSelectedStage(e.target.value)} value={selectedStage}>
                <option value="" disabled>Selecione um estágio</option>
                {allStages.map(({ ds_estagio, nr_sequencia }) => (
                  <option key={nr_sequencia} value={nr_sequencia}>
                    {ds_estagio}
                  </option>
                ))}
              </Select>
            </DivColumn>
          </DivRow>

          <ButtonRow style={{ marginTop: '1rem' }}>
            <Button className="cancel" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" onClick={handleEditStage} disabled={isDisabled}>Confirmar</Button>
          </ButtonRow>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}