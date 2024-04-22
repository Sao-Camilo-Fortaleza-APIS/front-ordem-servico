import * as Accordion from "@radix-ui/react-accordion";
import { OrderResponse } from "../../routes/ViewOrders";
import { Order } from "../Order";

interface ListOrdersWithoutExecutorProps {
  group: string
  orders: OrderResponse
}

export function ListOrdersWithoutExecutor({ group, orders }: ListOrdersWithoutExecutorProps) {
  function filterOrdersByGroup(group: string) {
    const listOrders = orders.filter(order => order.group === Number(group))
    return listOrders
  }

  return (
    <Accordion.Root type='single' collapsible>
      {group === '' ? (
        orders && orders.map((order) => (
          <Order
            key={order.number}
            number={order.number}
            damage={order.number + ' ' + order.damage}
            date_order={order.date_order}
            location={order.location}
            requester={order.requester}
            contact={order.contact}
            group={order.group}
          />
        ))
      ) : (
        group && filterOrdersByGroup(group)?.map((order) => (
          <Order
            key={order.number}
            number={order.number}
            damage={order.number + ' ' + order.damage}
            date_order={order.date_order}
            location={order.location}
            requester={order.requester}
            contact={order.contact}
            group={order.group}
          />
        ))
      )}
    </Accordion.Root>
  )
}
