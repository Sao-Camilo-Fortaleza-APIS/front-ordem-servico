import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContainerForm } from "../../Formularios/FormMaterial/styles";


export function ResultadoPage(){
    const {valor} = useParams()
    const [resultado, setResultado] = useState("")

    useEffect(() => {
        fetch(`http://10.10.0.200:4455/valor?mat=${valor}`)
        .then(response => response.json())
        .then(data => {
        setResultado(data)
        })
    },[valor])

    console.log(resultado)
    return(
        <ContainerForm>
            
        </ContainerForm>
    )
}