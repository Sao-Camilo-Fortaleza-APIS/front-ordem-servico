import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchSatisfactionDegrees } from '../../hooks/useDegreeSatisfaction';
import api from '../../services/api';
import { convertDate } from '../../utils/convert-date';
import { AnimatedBlock, Button, CancelBtn, CloseButton, ConfirmBtn, ConfirmContainer, Content, Overlay, TextArea, Title } from '../Report/styles';
import { SatisfactionOption, StarRating } from '../StartRating';
import { Table, TableCell, TableContainer, TableHeader, TableHeaderCell, TableRow } from "../TableReport/styles";

export interface OrderPendingData {
    closed: string
    date: string
    number: number
    title: string
}

interface PendingValidationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    requester: string
    data: OrderPendingData[]
}

export function PendingValidationModal({ open, onOpenChange, data, requester }: PendingValidationModalProps) {
    const [confirmApprove, setConfirmApprove] = useState<number | null>(null)
    const [confirmReject, setConfirmReject] = useState<number | null>(null)
    const [satisfactionDegrees, setSatisfactionDegrees] = useState<SatisfactionOption[]>([])
    const [satisfactionSelected, setSatisfactionSelected] = useState<string>('')
    const [commentForReject, setCommentForReject] = useState<string>('')

    const [newData, setNewData] = useState<OrderPendingData[]>(data)

    const [loading, setLoading] = useState(false)

    // criar um estado para armazenar erros
    const [warningSatisfaction, setWarningSatisfaction] = useState<string | null>(null)

    const handleApproveSelection = (number: number) => {
        setConfirmApprove(number)
        setConfirmReject(null)
        setSatisfactionSelected('')
        setWarningSatisfaction(null)
    }

    const handleRejectSelection = (number: number) => {
        setConfirmReject(number)
        setConfirmApprove(null)
        setSatisfactionSelected('')
        setWarningSatisfaction(null)
    }

    const handleApprove = async (hasApprove: 'yes' | 'not', numberOrder: number) => {
        if (!requester) {
            toast.error('Usuário não localizado')
            return
        }
        if (!numberOrder) {
            toast.error('Número da Ordem de Serviço não encontrado')
            return
        }

        setLoading(true)

        if (hasApprove === 'not') {
            try {
                await api.post('/post/approbation', {
                    nr_order: `${numberOrder}`,
                    has_approve: `${hasApprove}`
                })

                await api.post('/post/history/return', {
                    nr_order: numberOrder,
                    nm_user: requester,
                    history: commentForReject
                })

                setCommentForReject('')
                setConfirmReject(null)
                setNewData(newData.filter((item) => item.number !== numberOrder))
            } catch {
                console.error(error?.response?.data?.message)
            }

            setLoading(false)
        } else {
            if (!satisfactionSelected) {
                setWarningSatisfaction('Selecione uma opção de satisfação')
                return
            }
            try {
                await api.post('/post/rating', {
                    order: numberOrder,
                    rating: satisfactionSelected,
                })

                await api.post('/post/approbation', {
                    nr_order: `${numberOrder}`,
                    has_approve: `${hasApprove}`,
                    nm_usuario: requester
                })

                setConfirmApprove(null)
                setWarningSatisfaction(null)
                setNewData(newData.filter((item) => item.number !== numberOrder))
            } catch (error) {
                console.error(error?.response?.data?.message)
                return
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        if (newData.length === 0) {
            onOpenChange(false)
        }
    }, [newData])

    useEffect(() => {
        if (confirmApprove) {
            setWarningSatisfaction(null)
        }
    }, [confirmApprove])

    useEffect(() => {
        setNewData(data)
        if (data.length < 1) {
            onOpenChange(false)
        }
        if (newData.length < 1) {
            onOpenChange(false)
        }
    }, [data])

    useEffect(() => {
        setSatisfactionSelected('')
        setWarningSatisfaction(null)
        setConfirmApprove(null)
        setConfirmReject(null)
        setCommentForReject('')
        setNewData(data)
        setLoading(false)
    }, [open])

    useEffect(() => {
        fetchSatisfactionDegrees().then((response) => setSatisfactionDegrees(response)).catch(() => setSatisfactionDegrees([]))
    }, [])
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Overlay />
            <Content onInteractOutside={() => onOpenChange(false)}>
                <CloseButton asChild>
                    <X size={20} className="close" aria-label="Fechar" />
                </CloseButton>

                <Title>Ordens pendentes de aprovação</Title>

                <AnimatedBlock visible={true}>
                    {newData.length > 0 && (
                        <TableContainer>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderCell style={{ textAlign: 'center' }}>Nº</TableHeaderCell>
                                        <TableHeaderCell>Título</TableHeaderCell>
                                        <TableHeaderCell>Data</TableHeaderCell>
                                        <TableHeaderCell style={{ textAlign: 'center' }}>Aprovar</TableHeaderCell>
                                        <TableHeaderCell style={{ textAlign: 'center' }}>Reprovar</TableHeaderCell>
                                    </TableRow>
                                </TableHeader>

                                <tbody>
                                    {newData.map(({ date, number, title }) => (
                                        <Fragment key={number}>
                                            <TableRow>
                                                <TableCell style={{ textAlign: 'center' }}>{number}</TableCell>
                                                <TableCell style={{ whiteSpace: 'normal' }}>{title}</TableCell>
                                                <TableCell>{convertDate(date)}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => handleApproveSelection(number)} className='icon' type="button">
                                                        <Check size={28} />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button onClick={() => handleRejectSelection(number)} className='icon danger' type="button">
                                                        <X size={28} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>

                                            {confirmApprove === number && (
                                                <TableRow>
                                                    <TableCell colSpan={5} style={{ overflowWrap: 'break-word' }}>
                                                        <ConfirmContainer bgColor='#f0f9ff ' borderColor="#bae6fd" >
                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', lineHeight: '1' }}>
                                                                Avalie sua experiência:
                                                                <StarRating
                                                                    options={satisfactionDegrees}
                                                                    onRatingChange={(value) => {
                                                                        setSatisfactionSelected(value)
                                                                        setWarningSatisfaction(null)
                                                                    }}
                                                                />
                                                                {warningSatisfaction && (<span style={{ color: 'red', fontSize: '0.8rem' }}>{warningSatisfaction} </span>)}
                                                            </div>
                                                            <div>
                                                                <CancelBtn onClick={() => setConfirmApprove(null)} type="button">
                                                                    Cancelar
                                                                </CancelBtn>
                                                                <ConfirmBtn
                                                                    onClick={() => handleApprove('yes', number)}
                                                                    style={{ backgroundColor: '#2563eb' }}
                                                                    type="button"
                                                                    disabled={loading}
                                                                >
                                                                    {loading ? 'Aguarde...' : 'Confirmar'}
                                                                </ConfirmBtn>
                                                            </div>
                                                        </ConfirmContainer>
                                                    </TableCell>
                                                </TableRow>
                                            )}

                                            {confirmReject === number && (
                                                <TableRow>
                                                    <TableCell colSpan={5} style={{ overflowWrap: 'break-word' }}>
                                                        <ConfirmContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'start' }}>

                                                            <div style={{ width: '100%' }}>
                                                                <span>Deixe um comentário (opcional)</span>
                                                                <TextArea
                                                                    value={commentForReject}
                                                                    onChange={(e) => setCommentForReject(e.target.value)}
                                                                    rows={3}
                                                                    placeholder="Motivo da reprovação"
                                                                    style={{ width: '100%' }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <CancelBtn onClick={() => setConfirmReject(null)} type="button">
                                                                    Cancelar
                                                                </CancelBtn>
                                                                <ConfirmBtn
                                                                    onClick={() => handleApprove('not', number)}
                                                                    type="button"
                                                                    disabled={loading}
                                                                >
                                                                    {loading ? 'Aguarde...' : 'Confirmar'}
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
                    )}
                </AnimatedBlock>
            </Content>
        </Dialog.Root>
    )
}