import * as Dialog from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { FormStyled } from "./styles";


export function TakeOrderForm({ numberOrder }: { numberOrder: number }) {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [historyValue, setHistoryValue] = useState<string>('')
  const navigate = useNavigate()

  let user = Cookies.get('user') ?? ''

  async function handleSendOrderReply(event: any) {
    event.preventDefault()

    try {
      console.log('enviando resposta');

    } catch (error) {
      console.error(error)
    }
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };
  return (
    <FormStyled onSubmit={handleSendOrderReply}>
      <h3>Deseja assumir essa Ordem de Serviço?</h3>


      <div className="action-form">
        <Dialog.Close asChild>
          <Button>Não</Button>
        </Dialog.Close>
        <Button variant="reply" type="submit">Sim</Button>
      </div>
    </FormStyled>
  )
}
