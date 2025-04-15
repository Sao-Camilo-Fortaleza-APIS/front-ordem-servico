import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearch } from "../../contexts/SearchContext";
import api from "../../services/api";
import { Button } from "../Button";
import { OrderProps } from "../Order";
import { TransferOrderModal } from "../TransferOrderModal";
import { FormStyled } from "./styles";

export function TakeOrderForm({ numberOrder }: { numberOrder: number }) {
	const { setResultOrderData } = useSearch()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
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

		const loadingToast = toast.loading('Assumindo Ordem de Serviço...')
		try {

			await api.post('/post/takeon', {
				nr_order: numberOrder,
				nm_user: userLogged
			})

			// Atualiza o cache localmente
			const currentOrders = queryClient.getQueryData<OrderProps[]>(['user', 'pendentes', userLogged])
			if (currentOrders) {
				const updatedOrders = currentOrders.filter(order => order.number !== numberOrder)
				queryClient.setQueryData(['user', 'pendentes', userLogged], updatedOrders)
			}

			queryClient.invalidateQueries({ queryKey: ['user', 'pendentes', userLogged], refetchType: 'all' })
			queryClient.invalidateQueries({ queryKey: ['user', 'minhas', userLogged], refetchType: 'all' })

			toast.update(loadingToast, {
				render: 'Ordem de Serviço assumida!',
				type: 'success',
				isLoading: false,
				autoClose: 1000,
				closeButton: true,
			})

			setResultOrderData((prev) => ({
				...prev,
				executor: userLogged,
			}))
		} catch (error) {
			toast.update(loadingToast, {
				render: 'Erro ao assumir OS.',
				type: 'error',
				isLoading: false,
				autoClose: 2000,
			})
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
		<>
			<FormStyled onSubmit={handleSendOrderReply}>
				<div id="takeon-transfer">
					<Button id="takeon-button" type="submit">
						Assumir
					</Button>
					<Button onClick={() => setOpenTransferModal(true)} type="button" id="transfer-button">
						Transferir
					</Button>
				</div>
			</FormStyled>

			<TransferOrderModal
				open={openTransferModal}
				onOpenChange={setOpenTransferModal}
				numberOrder={numberOrder}
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

		</>
	)
}
