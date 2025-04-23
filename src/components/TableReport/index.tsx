import Cookies from 'js-cookie';
import { Trash2 } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistoryData } from '../../hooks/useHistoryData';
import api from '../../services/api';
import { convertDate } from '../../utils/convert-date';
import { ReportModalProps } from '../Report';
import { Button, CancelBtn, ConfirmBtn, ConfirmContainer } from '../Report/styles';
import { Table, TableCell, TableContainer, TableHeader, TableHeaderCell, TableRow } from './styles';

interface TableReportProps extends ReportModalProps {
    data: any[] // Array de laudos
}
export function TableReport({ open, data, onOpenChange, numberOrder }: TableReportProps) {
    const navigate = useNavigate()
    const { getHistory } = useHistoryData()
    const userLogged = Cookies.get('user')

    const [confirmingNRLaudo, setConfirmingNRLaudo] = useState<number | null>(null) // estado para controlar o id do laudo a ser inativado

    const handleInativarLaudo = async (id: number) => {
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
        const loadingToast = toast.loading('Inativando laudo...')
        try {
            await api.post('/post/revoke/report', {
                nr_laudo: id,
                nm_user: userLogged,
                nr_order: numberOrder,
            })

            toast.update(loadingToast, {
                render: 'Laudo inativado!',
                type: 'success',
                isLoading: false,
                autoClose: 1000,
                closeButton: true,
            })

            await getHistory(numberOrder.toString())

            onOpenChange(false)
        } catch (error: Error | any) {
            console.error(error?.response?.data?.message)
            toast.update(loadingToast, {
                render: `${error?.response?.data?.message || "Erro ao inativar laudo"}`,
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            })
            return
        }
    }

    useEffect(() => {
        setConfirmingNRLaudo(null) // Limpa o estado de confirmação ao abrir ou fechar o modal
    }, [open, numberOrder])

    return (
        <TableContainer>
            <Table>
                {/* colocar uma legenda à esquerda com a quantidade de laudos */}
                <caption>
                    {data.length || 0} laudos encontrado(s)
                </caption>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Laudo</TableHeaderCell>
                        <TableHeaderCell>Liberação</TableHeaderCell>
                        <TableHeaderCell>Técnico</TableHeaderCell>
                        <TableHeaderCell>Inativar</TableHeaderCell>
                        {/* <TableHeaderCell>Detalhes</TableHeaderCell> */}
                    </TableRow>
                </TableHeader>

                <tbody>
                    {data?.map((report: any) => (
                        <Fragment key={report.nr_laudo}>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center' }}>{report.nr_laudo}</TableCell>
                                <TableCell>{convertDate(report.dt_liberacao)}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{report.nm_tecnico}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    <Button className="icon danger" onClick={() => setConfirmingNRLaudo(report.nr_laudo)} type="button" autoFocus={false}>
                                        <Trash2 size={20} />
                                    </Button>
                                </TableCell>
                                {/* <TableCell style={{ textAlign: 'center' }}>
                                    <Button className='icon' type="button">
                                        <Eye size={20} />
                                    </Button>
                                </TableCell> */}
                            </TableRow>

                            {confirmingNRLaudo === report.nr_laudo && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <ConfirmContainer>
                                            <span>Deseja realmente inativar?</span>
                                            <div>
                                                <CancelBtn onClick={() => setConfirmingNRLaudo(null)}
                                                    type="button"
                                                >
                                                    Cancelar
                                                </CancelBtn>
                                                <ConfirmBtn
                                                    onClick={() => {
                                                        handleInativarLaudo(report.nr_laudo)
                                                        setConfirmingNRLaudo(null)
                                                    }}
                                                    type="button"
                                                >
                                                    Confirmar
                                                </ConfirmBtn>
                                            </div>
                                        </ConfirmContainer>
                                    </TableCell>
                                </TableRow>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    )
}