import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Order } from "../components/Order";
import api from "../services/api";
import { Container, Header } from "../styles/ViewOrders.styles";

export function ViewOrders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [typeUser, setTypeUser] = useState('')
  const [numberOrder, setNumberOrder] = useState(0)

  const { data: tagsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["get-orders", typeUser, numberOrder],
    queryFn: async () => {
      await api.get(`/get/order_user/${typeUser}/${numberOrder}`)
        .then(response => {
          return response.data
        })


    },
    placeholderData: keepPreviousData,
  })

  function handleFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSearchParams(params => {
      params.set('type', typeUser)
      params.set('number', numberOrder.toString())

      return params
    })
  }
  if (isLoading) {
    return null
  }

  return (
    <Container>
      <Header>
        <img src="./assets/logo_horizontal.svg" alt="Logo São Camilo" />

        <LogOut className="icon" size={26} />
      </Header>

      <div className="wrapper">
        <div className="quantidade">
          <span>Solicitações</span>

          <span>0</span>
        </div>
        <form onSubmit={handleFilter} className="filter">
          <Button>EM ATENDIMENTO</Button>
          <Button>AGUARDANDO</Button>
        </form>

        <div className="list-orders">
          <Order />
        </div>
      </div>
    </Container>
  )
}
