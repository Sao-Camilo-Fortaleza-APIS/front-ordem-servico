import * as Accordion from "@radix-ui/react-accordion";
import { OrderResponse } from "../../routes/MyOrders";
import { Order, OrderProps } from "../Order";

interface ListOrdersWithoutExecutorProps {
  group: string
  orders: OrderResponse
}

export function ListOrdersWithoutExecutor({ group, orders }: ListOrdersWithoutExecutorProps) {
  function filterOrdersByGroup(group: string) {
    const listOrders = orders.filter((order: OrderProps) => order.group === Number(group))
    return listOrders
  }

  return (
    <Accordion.Root type='single' collapsible>
      {group === '' ? (
        orders && orders.map((order: OrderProps) => (
          <Order
            key={order.number}
            number={order.number}
            damage={order.number + ' ' + order.damage}
            date_order={order.date_order}
            location={order.location}
            requester={order.requester}
            contact={order.contact}
            group={order.group}
            describe={order.describe}
            awaiting_validate={order.awaiting_validate}
          />
        ))
      ) : (
        group && filterOrdersByGroup(group)?.map((order: OrderProps) => (
          <Order
            key={order.number}
            number={order.number}
            damage={order.number + ' ' + order.damage}
            date_order={order.date_order}
            location={order.location}
            requester={order.requester}
            contact={order.contact}
            group={order.group}
            describe={order.describe}
            awaiting_validate={order.awaiting_validate}
          />
        ))
      )}
    </Accordion.Root>
  )
}
