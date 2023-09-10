import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { ContainerTabelas, Margem } from "./styles";

export default function TabelaMaterial(){
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [nr_material, setNr_material] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        try{
            fetch(`http://10.10.0.200:4321/get/material`)
            .then(response => response.json())
            .then(data => {
            setSolicitacoes(data)
            })
        }
        catch(status:any){
            const erro = status.request.status
            const request = status.request
           
            console.log('ERRO:',erro)
            console.log(request)

            if(erro == 500){
               // navigate('http:PAGINA_INTERNA:PORTA/erro');
            }
        }

    },[solicitacoes])

    function handleSave(ordem, nr_material, e_mail, nome_item) {
        setIsLoading(true)
        try{
            console.log({seq_os: ordem, nr_material: nr_material, email: e_mail, nm_material: nome_item})
            const response = api.put('/put/material', {seq_os: ordem, nr_material: nr_material, email: e_mail, nm_material: nome_item})
            setIsLoading(false);
            console.log(response)
        }
        catch(status:any){
            setIsLoading(false);
            const erro = status.request.status
            const request = status.request
            console.log('ERRO:',erro)
            console.log(request)
        }
    }

    return(
        <ContainerTabelas>
            <table>
                <thead>
                    <tr id="tr">
                        <th id="titulo">Número Ordem</th>
                        <th id="titulo">Endereço de e-mail</th>
                        <th id="titulo">Código TASY</th>
                        <th id="titulo">Descrição - Nome do Item</th>
                        <th id="titulo">Unidade de medida</th>
                        <th id="titulo">Padrão</th>
                        <th id="titulo">Estocavel</th>
                        <th id="titulo">Grupo material</th>
                        <th id="titulo">Informações Adicionais</th>
                        <th id="titulo">Salvar</th>
                    </tr>
                </thead>
                <tbody>
                {solicitacoes.map(soli => {
                    let fundo
                    let letra
                    let texto
                    if(soli.ds_solucao != null){
                        fundo = "#368800",
                        letra = "#FFF"
                    } else{
                        fundo ="#ffffff"
                        letra = "#000000"
                    }
                    if(soli.ds_solucao === 'EXISTE' ){
                        texto = "#fffff",
                        fundo= "#ff9d00"
                    }
                return (
                    <tr style={{background:fundo, color:letra}} key={soli.ordem}>
                        <td id="valor">{soli.ordem}</td>
                        <td id="valor">{soli.e_mail}</td>
                        <td id="valor">{soli.ds_solucao || <input type="text" placeholder="Número do material" value={nr_material[soli.ordem] || ""} onChange={e => setNr_material({...nr_material, [soli.ordem]: e.target.value})} />}</td>
                        <td id="valor">{soli.nome_item}</td>
                        <td id="valor">{soli.unidade}</td>
                        <td id="valor">{soli.ie_padrao}</td>
                        <td id="valor">{soli.ie_estoque}</td>
                        <td id="valor">{soli.grupo}</td>
                        <td id="valor">{soli.info}</td>
                        <td id="valor" style={{color: "#fff"}}>{soli.ds_solucao || <button id="btn" onClick={() => handleSave(soli.ordem , nr_material[soli.ordem], soli.e_mail, soli.nome_item)} >Salvar!</button>}</td>
                    </tr>
                )
            })}
                </tbody>
            </table>
            <Margem></Margem>
        </ContainerTabelas>
    )
}