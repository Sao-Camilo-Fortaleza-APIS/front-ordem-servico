import * as Dialog from '@radix-ui/react-dialog';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Button, ButtonRow, CloseButton, Content, Label, Overlay, Select, TextArea } from './styles';

interface TransferOrderModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    numberOrder: number;
    onSuccess?: () => void;
}

interface ExecutorProps {
    id: string
    user: string
}

export function TransferOrderModal({ open, onOpenChange, numberOrder, onSuccess }: TransferOrderModalProps) {
    const navigate = useNavigate()

    const [allWorkgroups, setAllWorkgroups] = useState<Record<string, any[]> | null>(null);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [users, setUsers] = useState<ExecutorProps[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [comment, setComment] = useState('');

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

    const handleTransfer = async () => {
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

        try {
            await api.post('/post/transfer/workgroup', {
                code_workgroup: selectedGroup,
                nm_usuario: userLogged,
                nm_user_destiny: selectedUser,
                nr_order: numberOrder,
                ds_history_transf: comment
            });
            toast.success('Transferido com sucesso');
            // onSuccess();
            onOpenChange(false);
        } catch (e) {
            toast.error('Erro ao transferir ordem');
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Overlay />
            <Content>
                <CloseButton asChild title='Fechar'>
                    <X size={20} className="close" aria-label='Fechar' onClick={() => onOpenChange(false)} style={{ cursor: 'pointer' }} />
                </CloseButton>
                <Label htmlFor="group">Grupo de trabalho</Label>
                <Select id="group" onChange={e => setSelectedGroup(e.target.value)} value={selectedGroup}>
                    <option value="">Selecione...</option>
                    {allWorkgroups && Object.entries(allWorkgroups).map(([label, grupos]) => (
                        <optgroup label={label} key={label}>
                            {grupos.map(g => (
                                <option key={g.seq_gp_trab} value={g.seq_gp_trab}>{g.ds_grupo_trabalho}</option>
                            ))}
                        </optgroup>
                    ))}
                </Select>

                <Label htmlFor="user">Usuário (opcional)</Label>
                <Select id="user" onChange={e => setSelectedUser(e.target.value)} value={selectedUser}>
                    <option value="">Selecione...</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.user}</option>
                    ))}
                </Select>

                <Label htmlFor="comment">Histórico</Label>
                <TextArea id="comment" value={comment} onChange={e => setComment(e.target.value)} />

                <ButtonRow>
                    <Button className="cancel" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleTransfer}>Confirmar</Button>
                </ButtonRow>
            </Content>
        </Dialog.Root>
    );
}
