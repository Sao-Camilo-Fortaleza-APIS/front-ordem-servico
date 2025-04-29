import * as Dialog from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSearch } from '../../contexts/SearchContext';
import { useHistoryData } from '../../hooks/useHistoryData';
import api from '../../services/api';
import { OrderProps } from '../Order';
import { Button, ButtonRow, CloseButton, Content, Label, Overlay, Select, TextArea } from './styles';

type GrupoTrabalho = {
    seq_gp_trab: number;
    ds_grupo_trabalho: string;
}

interface TransferOrderModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    numberOrder: number;
}

interface ExecutorProps {
    id: string
    user: string
}

export function TransferOrderModal({ open, onOpenChange, numberOrder }: TransferOrderModalProps) {
    const { setResultOrderData, resultOrderData, isLoading, setIsLoading } = useSearch()
    const { getHistory } = useHistoryData()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [allWorkgroups, setAllWorkgroups] = useState<Record<string, GrupoTrabalho[]> | null>(null);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [users, setUsers] = useState<ExecutorProps[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [comment, setComment] = useState('');

    const handleTransfer = async (e?: MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()

        setIsLoading(true)
        const userLogged = Cookies.get('user')

        if (!userLogged) {
            Cookies.remove('user')
            Cookies.remove('exec.token')
            return navigate('/entrar')
        }
        if (!numberOrder) {
            toast.error('Número da Ordem de Serviço não encontrado')
            return
        }

        if (selectedGroup === '') {
            return toast.error('Selecione um grupo de trabalho')
        }

        const loadingToast = toast.loading('Transferindo Ordem de Serviço...')
        try {

            await api.post('/post/transfer/workgroup', {
                code_workgroup: selectedGroup,
                nm_usuario: userLogged,
                nm_user_destiny: selectedUser,
                nr_order: numberOrder,
                ds_history_transf: comment,
                nr_internship_old: Number(resultOrderData?.nr_stage),
            })

            //Atualzia o cache localmente
            const currentOrders = queryClient.getQueryData<OrderProps[]>(['user', 'pendentes', userLogged])
            if (currentOrders) {
                const updatedOrders = currentOrders.filter(order => order.number !== numberOrder)
                queryClient.setQueryData(['user', 'pendentes', userLogged], updatedOrders)
            }

            queryClient.invalidateQueries({ queryKey: ['user', 'pendentes', userLogged], refetchType: 'all' })
            queryClient.invalidateQueries({ queryKey: ['user', 'minhas', userLogged], refetchType: 'all' })

            toast.update(loadingToast, {
                render: 'Ordem de Serviço transferida!',
                type: 'success',
                isLoading: false,
                autoClose: 1000,
                closeButton: true,
            })

            if (userLogged !== selectedUser) {
                setTimeout(() => {
                    return navigate(-1)
                }, 1000)
            }

            if (userLogged === selectedUser) {
                setResultOrderData((prev) => ({
                    ...prev,
                    executor: userLogged,
                }))
                await getHistory(numberOrder.toString())
            }

            setSelectedGroup('')
            setSelectedUser('')
            setComment('')
            setIsLoading(false)
            onOpenChange(false);
        } catch (e) {
            console.error(e)
            setIsLoading(false)
            if (e instanceof Error) {
                toast.update(loadingToast, {
                    render: `${e.message}`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                })
                return
            }

            toast.update(loadingToast, {
                render: 'Erro ao transferir OS.',
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            })
        }
    };

    const isDisabled: boolean = !selectedGroup || isLoading;

    useEffect(() => {
        if (open) {
            api.get('/get/workgroup')
                .then(res => setAllWorkgroups(res.data))
                .catch(() => toast.error('Erro ao buscar grupos'));
        }
    }, [open]);

    useEffect(() => {
        if (selectedGroup) {
            api.get(`/get/users/workgroup/${selectedGroup}`)
                .then(res => setUsers(res.data))
                .catch(() => toast.error('Erro ao buscar usuários do grupo'));
        }
    }, [selectedGroup]);

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Overlay />
            <Content>
                <CloseButton asChild title='Fechar'>
                    <X size={20} className="close" aria-label='Fechar' onClick={() => onOpenChange(false)} style={{ cursor: 'pointer' }} />
                </CloseButton>
                <Label htmlFor="group">Grupo de trabalho</Label>
                <Select id="group" onChange={e => setSelectedGroup(e.target.value)} value={selectedGroup}>
                    <option value="" disabled>Selecione...</option>
                    {allWorkgroups && Object.entries(allWorkgroups).map(([label, groups]) => (
                        <optgroup label={label} key={label}>
                            {groups.map(g => (
                                <option key={g.seq_gp_trab} value={g.seq_gp_trab}>{g.ds_grupo_trabalho}</option>
                            ))}
                        </optgroup>
                    ))}
                </Select>

                <Label htmlFor="user">Usuário <span>(opcional)</span></Label>
                <Select id="user" onChange={e => setSelectedUser(e.target.value)} value={selectedUser}>
                    <option value="">Sem executor...</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.user}</option>
                    ))}
                </Select>

                <Label htmlFor="comment">Comentário <span>(opcional)</span></Label>
                <TextArea
                    id="comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Deixei algum comentário se for necessário..."
                />

                <ButtonRow>
                    <Button disabled={isLoading} type="button" className="cancel" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button type="submit" onClick={handleTransfer} disabled={isDisabled}>Confirmar</Button>
                </ButtonRow>
            </Content>
        </Dialog.Root>
    );
}
