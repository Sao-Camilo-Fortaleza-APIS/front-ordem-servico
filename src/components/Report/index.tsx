import * as Dialog from '@radix-ui/react-dialog';
import Cookies from 'js-cookie';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { AnimatedBlock, Button, ButtonRow, CloseButton, Content, DivColumn, DivRow, Input, Label, Overlay, TextArea, Title } from './styles';

export interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  numberOrder: number;
}

export interface ReportData {
  details: {
    ds_acessorios: string
    ds_armazenamento: string
    ds_laudo: string
    ds_marca: string
    ds_modelo: string
    ds_problema: string
    nr_patrimonio: string
    ds_observacao: string
    nr_serial: string
  }
  dt_liberacao: string
  nm_tecnico: string
  nr_laudo: number
}

import { useHistoryData } from '../../hooks/useHistoryData';
import { TableReport } from '../TableReport';
import { TableSkeleton } from '../TableSkeleton';

export function ReportModal({ open, onOpenChange, numberOrder }: ReportModalProps) {
  const navigate = useNavigate()
  const { getHistory } = useHistoryData()

  const [responseReport, setResponseReport] = useState<ReportData[]>([]) // estado para armazenar os laudos já existentes
  const [isLoading, setIsLoading] = useState(true) // estado para controlar o carregamento dos laudos

  const [isAddingReport, setIsAddingReport] = useState(false) // estado para controlar se está adicionando um laudo ou não

  const [patrimony, setPatrimony] = useState<number | undefined>()
  const [serial, setSerial] = useState<string>("")
  const [brand, setBrand] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [storage, setStorage] = useState<string>("")
  const [accessory, setAccessory] = useState<string>("")
  const [observation, setObservation] = useState<string>("") //opcional
  const [defect, setDefect] = useState<string>("")
  const [report, setReport] = useState<string>("")

  const userLogged = Cookies.get('user')

  /**
   * Verifica se todos os campos obrigatórios estão preenchidos
   * @returns boolean
   */
  const checkAllFieldsFilled = () => {
    const requiredFields: { value: string | number | undefined; type: 'string' | 'number' }[] = [
      { value: patrimony, type: 'number' },
      { value: serial, type: 'string' },
      { value: brand, type: 'string' },
      { value: model, type: 'string' },
      { value: storage, type: 'string' },
      { value: defect, type: 'string' },
      { value: report, type: 'string' },
    ]

    return requiredFields.every(({ value, type }) => {
      if (type === 'string') {
        return typeof value === 'string' && value.trim() !== ''
      }
      if (type === 'number') {
        return typeof value === 'number' && !isNaN(value)
      }
      return false;
    })
  }

  /**
   * Função para lidar com o envio do laudo, verificando se o usuário está logado, se existe um número de ordem e se todos os campos obrigatórios estão preenchidos.
   * @param e - Evento de clique do botão (parâmetro opcional)
   */
  async function handleReport(e?: React.MouseEvent<HTMLButtonElement>) {
    e?.preventDefault()

    if (!userLogged) {
      toast.error('Sessão expirada, faça login novamente')
      Cookies.remove('user')
      Cookies.remove('exec.token')
      return navigate('/entrar')
    }
    if (!numberOrder) {
      toast.error('Número da Ordem de Serviço não encontrado')
      return
    }

    if (!checkAllFieldsFilled()) {
      toast.info('Preencha todos os campos obrigatórios', { position: "top-center" })
      return
    }

    const loadingToast = toast.loading('Enviando laudo...')
    try {
      await api.post('/post/report', {
        nm_user: userLogged,
        nr_order: numberOrder,
        cp_patrimonio: patrimony,
        cp_serial: serial,
        cp_marca: brand,
        cp_modelo: model,
        cp_armazenamento: storage,
        cp_acessorio: accessory,
        cp_observacao: observation,
        cp_defeito: defect,
        cp_laudo: report,
      })

      toast.update(loadingToast, {
        render: 'Laudo enviado!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      })


      onOpenChange(false)
      resetStates()
      setIsAddingReport(false)
      await getHistory(numberOrder.toString())
    } catch (error) {
      toast.update(loadingToast, {
        render: `${(error as any)?.response?.data?.message || "Erro ao enviar laudo"}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      })
      return
    }
  }

  const resetStates = () => {
    setPatrimony(undefined)
    setSerial("")
    setBrand("")
    setModel("")
    setStorage("")
    setAccessory("")
    setObservation("") //opcional
    setDefect("")
    setReport("")
  }

  const handleCancel = () => {
    onOpenChange(false)
    resetStates()
    setIsAddingReport(false)
  }

  const isDisabled = !checkAllFieldsFilled()

  useEffect(() => {
    setIsAddingReport(false) // reseta o estado de adicionar laudo ao abrir o modal

    if (open) {
      setIsLoading(true)
      api.get(`/get/report/${numberOrder}`)
        .then((response) => {
          setResponseReport(response.data)
          setIsLoading(false)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error('Sessão expirada, faça login novamente')
            Cookies.remove('exec.token')
            Cookies.remove('user')
            navigate('/entrar')
            return
          }

          if (error.response.status !== 404) {
            toast.error('Erro ao buscar laudos')
            return
          }
          setResponseReport([])
          setIsLoading(false)
        })
    }
  }, [open, numberOrder])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Overlay />
      <Content>
        <CloseButton asChild title="Fechar">
          <X size={20} className="close" aria-label="Fechar" onClick={handleCancel} style={{ cursor: "pointer" }} />
        </CloseButton>

        <Title>Laudos da Ordem de Serviço</Title>

        <AnimatedBlock visible={!isAddingReport}>
          {isLoading
            ? (<TableSkeleton />)
            : responseReport?.length > 0 ? (
              <>
                <TableReport numberOrder={numberOrder} onOpenChange={onOpenChange} open data={responseReport} />
                {/* Botão de adicionar */}
                <Button
                  onClick={() => setIsAddingReport(true)}
                  type="button"
                >
                  <Plus size={20} /> Adicionar laudo
                </Button>
              </>
            ) :
              (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginBottom: '0.5rem' }}>Nenhum laudo encontrado para esta Ordem de Serviço.</p>
                  <Button onClick={() => setIsAddingReport(true)} style={{ justifySelf: 'center' }} type="button">Adicionar laudo</Button>
                </div>
              )}
        </AnimatedBlock>

        <AnimatedBlock visible={isAddingReport}>
          <Button
            type="button"
            className="cancel ghost"
            onClick={() => {
              resetStates()
              setIsAddingReport(false)
            }}
            style={{ justifySelf: 'flex-start' }}
          >
            <ArrowLeft size={20} /> Voltar para lista
          </Button>
          {/* adicionar um scroll vertical */}
          <div style={{ maxHeight: '20rem', overflowY: 'auto' }}>
            <DivRow>
              <DivColumn>
                <Label htmlFor="n-pat">Nº Patrimônio</Label>
                <Input id="n-pat" value={patrimony}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      setPatrimony(Number(value));
                    }
                  }}
                  autoFocus={true}
                  type="number" min={0} required />
              </DivColumn>

              <DivColumn>
                <Label htmlFor="serial-number">Serial</Label>
                <Input id="serial-number" value={serial} onChange={e => setSerial(e.target.value)} type="text" required />
              </DivColumn>
            </DivRow>

            <DivRow>
              <DivColumn>
                <Label htmlFor="brand">Marca</Label>
                <Input id="brand" value={brand} onChange={e => setBrand(e.target.value)} type="text" required />
              </DivColumn>
            </DivRow>

            <DivRow>
              <DivColumn>
                <Label htmlFor="model">Modelo</Label>
                <Input id="model" value={model} onChange={e => setModel(e.target.value)} type="text" required />
              </DivColumn>

              <DivColumn>
                <Label htmlFor="storage">Armazenamento</Label>
                <Input id="storage" value={storage} onChange={e => setStorage(e.target.value)} type="text" required />
              </DivColumn>
            </DivRow>

            <DivRow>
              <DivColumn>
                <Label htmlFor="defect">Defeito/Reclamação</Label>
                <TextArea
                  id="defect"
                  value={defect}
                  onChange={e => setDefect(e.target.value)}
                  placeholder="Descreva o defeito ou reclamação do cliente..."
                  required
                />
              </DivColumn>
            </DivRow>

            <DivRow>
              <DivColumn>
                <Label htmlFor="report">Laudo Técnico</Label>
                <TextArea
                  id="report"
                  value={report}
                  onChange={e => setReport(e.target.value)}
                  placeholder="Descreva o laudo do equipamento..."
                  required
                />
              </DivColumn>
            </DivRow>

            <DivRow>
              <DivColumn>
                <Label htmlFor="accessory">Acessórios <span>(opcional)</span></Label>
                <TextArea
                  id="accessory"
                  value={accessory}
                  onChange={e => setAccessory(e.target.value)}
                  placeholder="Informe os acessórios que estão acompanhando, se necessário..."
                />
              </DivColumn>
            </DivRow>

            <DivRow>
              <DivColumn>
                <Label htmlFor="observation">Observação <span>(opcional)</span></Label>
                <TextArea
                  id="observation"
                  value={observation}
                  onChange={e => setObservation(e.target.value)}
                  placeholder="Deixei algum comentário se for necessário..."
                />
              </DivColumn>
            </DivRow>

          </div>
          <ButtonRow>
            <Button className="cancel" onClick={handleCancel}>Fechar</Button>
            <Button type="submit" onClick={handleReport} disabled={isDisabled}>Confirmar</Button>
          </ButtonRow>
        </AnimatedBlock>

      </Content>
    </Dialog.Root >
  );
}
