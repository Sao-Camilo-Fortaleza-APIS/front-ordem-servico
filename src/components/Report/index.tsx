import * as Dialog from '@radix-ui/react-dialog';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Button, ButtonRow, CloseButton, Content, DivColumn, DivRow, Input, Label, Overlay, Table, TableCell, TableHeader, TableHeaderCell, TableRow, TextArea, Title } from './styles';

interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  numberOrder: number;
}

/*
** Vai pro form **

  request.json.get("nm_user") => userLogged
  request.json.get("nr_order") => numberOrder
  request.json.get("cp_patriomonio,")
  request.json.get("cp_serial,")
  request.json.get("cp_brand,")
  request.json.get("cp_modelo,")
  request.json.get("cp_armazenamento,")
  request.json.get("cp_acessorio,")
  request.json.get("cp_observationervacao,")
  request.json.get("cp_defeito,")
  request.json.get("cp_laudo,")
*/

export function ReportModal({ open, onOpenChange, numberOrder }: ReportModalProps) {
  const navigate = useNavigate()

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

      setTimeout(() => {
        onOpenChange(false)
        resetStates()
      }, 1000)
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
  }

  const isDisabled = !checkAllFieldsFilled()

  // buscar os laudos já  existem para essa ordem de serviço
  const { data: responseReport } = useQuery({
    queryKey: ['report', numberOrder],
    queryFn: async () => {
      const response = await api.get(`/get/report/${numberOrder}`)

      if (response.status === 401) {
        toast.error('Sessão expirada, faça login novamente')
        Cookies.remove('exec.token')
        Cookies.remove('user')
        navigate('/entrar')
      }
      console.log("response", response.data)
      return response.data
    },
    placeholderData: keepPreviousData,
  })

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Overlay />
      <Content>

        <Title>Laudos da Ordem de Serviço</Title>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nº Patrimônio</TableHeaderCell>
              <TableHeaderCell>Serial</TableHeaderCell>
              <TableHeaderCell>Marca</TableHeaderCell>
              <TableHeaderCell>Modelo</TableHeaderCell>
              <TableHeaderCell>Armazenamento</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <tbody>
            {responseReport?.map((report: any) => (
              <TableRow key={report.id}>
                <TableCell>{report.patrimony}</TableCell>
                <TableCell>{report.serial}</TableCell>
                <TableCell>{report.brand}</TableCell>
                <TableCell>{report.model}</TableCell>
                <TableCell>{report.storage}</TableCell>
              </TableRow>
            ))}
            {Array(5).fill(0).map((_, index) => (
              <TableRow key={index}>
                <TableCell>dsfsdf</TableCell>
                <TableCell>sdfsdf</TableCell>
                <TableCell>sdfsdf</TableCell>
                <TableCell>sdfsd</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <CloseButton asChild title="Fechar">
          <X size={20} className="close" aria-label="Fechar" onClick={handleCancel} style={{ cursor: "pointer" }} />
        </CloseButton>

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
              type="number" min={0} required />
          </DivColumn>

          <DivColumn>
            <Label htmlFor="serial-number">Serial</Label>
            <Input id="serial-number" value={serial} onChange={e => setSerial(e.target.value)} type="text" required maxLength={20} />
          </DivColumn>
        </DivRow>

        <Label htmlFor="brand">Marca</Label>
        <Input id="brand" value={brand} onChange={e => setBrand(e.target.value)} type="text" required maxLength={50} />

        <DivRow>
          <DivColumn>
            <Label htmlFor="model">Modelo</Label>
            <Input id="model" value={model} onChange={e => setModel(e.target.value)} type="text" required maxLength={20} />
          </DivColumn>

          <DivColumn>
            <Label htmlFor="storage">Armazenamento</Label>
            <Input id="storage" value={storage} onChange={e => setStorage(e.target.value)} type="text" required maxLength={10} />
          </DivColumn>
        </DivRow>

        <Label htmlFor="accessory">Acessórios <span>(opcional)</span></Label>
        <TextArea
          id="accessory"
          value={accessory}
          onChange={e => setAccessory(e.target.value)}
          placeholder="Informe os acessórios que estão acompanhando, se necessário..."
        />

        <Label htmlFor="observation">Observação <span>(opcional)</span></Label>
        <TextArea
          id="observation"
          value={observation}
          onChange={e => setObservation(e.target.value)}
          placeholder="Deixei algum comentário se for necessário..."
        />

        <Label htmlFor="defect">Defeito/Reclamação</Label>
        <TextArea
          id="defect"
          value={defect}
          onChange={e => setDefect(e.target.value)}
          placeholder="Descreva o defeito ou reclamação do cliente..."
          required
        />

        <Label htmlFor="report">Laudo Técnico</Label>
        <TextArea
          id="report"
          value={report}
          onChange={e => setReport(e.target.value)}
          placeholder="Descreva o laudo do equipamento..."
          required
        />

        <ButtonRow>
          <Button className="cancel" onClick={handleCancel}>Cancelar</Button>
          <Button type="submit" onClick={handleReport} disabled={isDisabled}>Confirmar</Button>
        </ButtonRow>
      </Content>
    </Dialog.Root >
  );
}
