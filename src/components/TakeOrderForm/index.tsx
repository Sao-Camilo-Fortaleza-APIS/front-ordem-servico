import Cookies from "js-cookie";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Button } from "../Button";
import { FormStyled } from "./styles";

type GrupoTrabalho = {
	seq_gp_trab: number;
	ds_grupo_trabalho: string;
}
type DadosAPI = Record<string, GrupoTrabalho[]>

export function TakeOrderForm({ numberOrder }: { numberOrder: number }) {
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
	const [allWorkgroups, setAllWorkgroups] = useState<DadosAPI | null>(null)
	const [selectedGroup, setSelectedGroup] = useState()

	let user = Cookies.get('user') ?? ''

	async function fetchWorkgroups() {
		await api.get(`/get/workgroup`)
			.then((response) => {
				console.log("Grupo Trabalho", response.data)
				setAllWorkgroups(response.data)
			}).catch((error) => {
				console.error(error)
				toast.error('Erro ao buscar grupos de trabalho')
			}
			)
	}

	async function handleSendOrderReply(event: any) {
		event.preventDefault()

		try {
			if (!user || user === '') {
				Cookies.remove('user')
				Cookies.remove('exec.token')
				navigate('/signin')
			} else if (!numberOrder) {
				toast.error('Número da Ordem de Serviço não encontrado')
				return
			}
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

	async function handleTransferOrder(event: MouseEvent<HTMLButtonElement>) {
		event?.preventDefault()

		if (!selectedGroup) {
			toast.error("Selecione um grupo para transferir")
			return
		}

		await api.post('post/transfer/workgroup', {
			code_workgroup: selectedGroup,
			nr_order: numberOrder,
		}).then(() => {
			toast.success("Ordem de Serviço transferida!")
			navigate(-1)
		}).catch((error) => {
			console.log(error);
			toast.error("Ocorreu um erro")
		})
	}

	const handleChange = (event: any) => {
		setSelectedGroup(event.target.value);
	};

	return (
		<FormStyled >

			{!open && (
				<div id="takeon-transfer">
					<Button
						type="submit"
						id="takeon-button"
						onClick={handleSendOrderReply}>
						Assumir
					</Button>
					<Button
						type="button"
						id="transfer-button"
						onClick={() => {
							setOpen(true)
							fetchWorkgroups()
						}}>
						Transferir
					</Button>
				</div>
			)}


			{open && (
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

					<div id="confirm-or-cancel">
						<button type="submit" id="confirm-button" onClick={handleTransferOrder}>Confirmar</button>
						<button type="button" id="cancel-button" onClick={() => setOpen(false)}>Cancelar transfência</button>
					</div>
				</div>
			)}
		</FormStyled>
	)
}
