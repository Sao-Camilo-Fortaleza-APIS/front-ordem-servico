import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { FormStyled } from "./styles";
import { useState } from "react";
import { GroupProps, GroupResponse } from "../../routes/ViewOrders";


export function TakeOrderForm({ numberOrder }: { numberOrder: number }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [allWorkgroups, setAllWorkgroups] = useState<GroupResponse>()
  const [selectedGroup, setSelectedGroup] = useState()

  let user = Cookies.get('user') ?? ''

  async function fetchWorkgroups() {
    await api.get(`/get/workgroup`)
      .then((response) => {
        console.log(response.data)
        setAllWorkgroups(response.data)
      })

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
      window.location.reload()

      toast.success('Ordem de Serviço assumida')
    } catch (error) {
      toast.error('Erro ao assumir Ordem de Serviço')
      console.error(error)
    }
  }

  async function handleTransferOrder() {
    await api.post('post/transfer/workgroup', {
      code_workgroup: selectedGroup,
      nr_order: numberOrder,
    }).then(() => {
      toast.success("Ordem de Serviço transferida!")
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
      <div className="div-1">

        <button type="submit" onClick={handleSendOrderReply}>Assumir</button>
        <button
          type="button"
          onClick={() => {
            setOpen(true)
            fetchWorkgroups()
          }}>
          Transferir</button>
      </div>


      <div className="confirm-transfer">
        {open && (
          <>
            <label htmlFor="groups">Selecione o grupo para transferir</label>
            <select
              className="select-group"
              name="groups"
              id="groups"
              onChange={handleChange}
              value={selectedGroup}
            >
              <option value="">Selecione...</option>

              {allWorkgroups && allWorkgroups.map((group: GroupProps) => {
                return <option key={group.code} value={group.code}>{group.describe}</option>
              })}

            </select>

            <div>
              <button type="button" onClick={() => setOpen(false)}>Fechar</button>
              <button onClick={handleTransferOrder}>Confirmar</button>
            </div>
          </>
        )}
      </div>
    </FormStyled>
  )
}
