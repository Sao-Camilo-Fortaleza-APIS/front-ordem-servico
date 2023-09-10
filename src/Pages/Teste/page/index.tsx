import { useState } from "react";
import { Link } from "react-router-dom";
import { ContainerForm } from "../../Formularios/FormMaterial/styles";



export function TestePage(){
    const [valor, setValor] = useState('');

    return(
        <ContainerForm>
            <input type="text" value={valor} onChange={e => setValor(e.target.value)}/>
            <Link to={`/teste/${valor}`}>
                <button type="submit">Resultado</button>
            </Link>
        </ContainerForm>
    )
}