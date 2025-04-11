import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Button } from "../Button";
import { TransferOrderModal } from "../TransferOrderModal";
import { FormStyled } from "./styles";

type GrupoTrabalho = {
	seq_gp_trab: number;
	ds_grupo_trabalho: string;
}
type DadosAPI = Record<string, GrupoTrabalho[]>

export function TakeOrderForm({ numberOrder }: { numberOrder: number }) {
	const navigate = useNavigate()
	const [openTransferModal, setOpenTransferModal] = useState(false)

	/* async function fetchWorkgroups() {
		await api.get(`/get/workgroup`)
			.then((response) => {
				console.log("Grupo Trabalho", response.data)
				setAllWorkgroups(response.data)
			}).catch((error) => {
				console.error(error)
				toast.error('Erro ao buscar grupos de trabalho')
			}
			)
	} */

	async function handleSendOrderReply(event: any) {
		event.preventDefault()
		const user = Cookies.get('user')

		if (!user) {
			Cookies.remove('user')
			Cookies.remove('exec.token')
			return navigate('/entrar')
		}
		if (!numberOrder) {
			toast.error('Número da Ordem de Serviço não encontrado')
			return
		}

		try {
			await api.post('/post/takeon', {
				nr_order: numberOrder,
				nm_user: user
			})

			toast.success('Ordem de Serviço assumida')
			navigate(-1)
		} catch (error) {
			toast.error('Erro ao assumir Ordem de Serviço')
			console.error(error)
		}
	}

	/* async function handleTransferOrder(event: MouseEvent<HTMLButtonElement>) {
		event?.preventDefault()

		if (!selectedGroup) {
			toast.error("Selecione um grupo para transferir")
			return
		}

		const user_logged = Cookies.get('user') ?? ''
		console.log("user_logged", user_logged)
		if (!user_logged || user_logged === '') {
			//Lançar uma notificação de erro
			toast.error('Sessão expirada, faça login novamente')
			Cookies.remove('exec.token')
			Cookies.remove('user')
			navigate('/entrar')
			return
		}

		await api.post('post/transfer/workgroup', {
			nm_usuario: user_logged,
			code_workgroup: selectedGroup,
			nr_order: numberOrder,
			ds_historico: 'Transferido para outro grupo'

		}).then(() => {
			toast.success("Ordem de Serviço transferida!")
			navigate(-1)
		}).catch((error) => {
			console.log(error);
			toast.error("Ocorreu um erro")
		})
	} */

	return (
		<FormStyled >
			<div id="takeon-transfer">
				<Button onClick={handleSendOrderReply} id="takeon-button" type="submit">
					Assumir
				</Button>
				<Button onClick={() => setOpenTransferModal(true)} type="button" id="transfer-button">
					Transferir
				</Button>
			</div>

			<TransferOrderModal
				open={openTransferModal}
				onOpenChange={setOpenTransferModal}
				numberOrder={numberOrder}
			/* onSuccess={() => navigate("/ordens/pendentes")} */
			/>

			{/* {open && (
				<div className="confirm-transfer">
					<div>
						<label
							htmlFor="groups"
							style={{ width: '100%' }}
						>
							Selecione o grupo para transferir

						</label>
						<select
							className="select-group"
							name="groups"
							id="groups"
							onChange={handleChange}
							value={selectedGroup}
						>
							<option value="">Selecione...</option>
							{allWorkgroups &&
								Object.entries(allWorkgroups).map(([gruposPlanejamento, gruposTrabalho]) => (
									<optgroup key={gruposPlanejamento} label={gruposPlanejamento} style={{ backgroundColor: '#f5f5f5' }}>
										{gruposTrabalho.map((grupo) => (
											<option key={grupo.seq_gp_trab} value={grupo.seq_gp_trab} >
												{grupo.ds_grupo_trabalho}
											</option>
										))}
									</optgroup>
								))}
						</select>
					</div>
					<div>
						<label htmlFor="users">Deseja atribuir a um usuário? (opcional)</label>

						<select name="users" id="user">

						</select>
					</div>

					<div>
						<label htmlFor="comment">Histórico</label>

						<textarea name="comment" id="comment" />
					</div>

					<div id="confirm-or-cancel">
						<button type="submit" id="confirm-button" onClick={handleTransferOrder}>Confirmar</button>
						<button type="button" id="cancel-button" onClick={() => setOpen(false)}>Cancelar transfência</button>
					</div>
				</div>
			)} */}
		</FormStyled>
	)
}
