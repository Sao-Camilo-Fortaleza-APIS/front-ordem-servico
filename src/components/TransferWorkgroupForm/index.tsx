import { Button } from "../Button";
import { FormStyled } from "./styles";


export function TransferWorkgroupForm({ numberOrder }: { numberOrder: number }) {
    return (
        <FormStyled onSubmit={() => console.log("enviou")}>
            <div className="content-form">
                <select name="workgroup" id="workgroup">
                    <option value="1">Grupo 1</option>
                    <option value="2">Grupo 2</option>
                    <option value="3">Grupo 3</option>
                </select>
            </div>
            <div className="action-form">
                <Button type="button">Cancelar</Button>
                <Button type="submit">Transferir</Button>
            </div>
        </FormStyled>
    )
}