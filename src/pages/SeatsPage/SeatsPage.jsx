import axios from "axios";
import { useEffect, useState } from "react"
import {  useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"

export default function SeatsPage() {

    const [seats, setSeats] = useState([]);
    const [waiting, setWaiting] = useState(false);
    const params1 = useParams();
    const [arraySelecionados, setSelecionados] = useState([]);
    
    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [filme, setFilme] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [cadeiraArray, setCadeiraArray] = useState ([])

  // const objeto {cpf, setCpf, name, setName, cadeiraArray, setCadeiraArray, filme, setFilme, data, setData, hora, setHora} = props

    const navigate = useNavigate()
    

    useEffect(() => {
       
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params1.idSessao}/seats`)

        promisse.then((resposta) => {
            console.log(resposta.data)
            setSeats(resposta.data)
            setWaiting(true)
            setCadeiraArray([]);

     
        })

        promisse.catch((erro) =>{
            console.log(erro.response.data)
        })
        

       
    }, []);



    function selecionarCadeira(cadeira){
        console.log(cadeira.isAvailable)
        setFilme(seats.movie.title)
        setData(seats.day.date)
        setHora(seats.name)
        
        

        if(cadeira.isAvailable === false){
            alert("Esse assento não está disponível")
        } else if(!arraySelecionados.includes(cadeira.id)){
            let arrayAux = [...arraySelecionados, cadeira.id];
            setSelecionados(arrayAux)
            
            const auxCadeira = [...cadeiraArray, cadeira.name]
            setCadeiraArray(auxCadeira)



        }else{
            const arrayAux2 = [...arraySelecionados];
            const index = arrayAux2.indexOf(cadeira.id)
            arrayAux2.splice(index, 1)
            setSelecionados(arrayAux2)

            const arrayAux3 = [...cadeiraArray];
            const index1 = arrayAux3.indexOf(cadeira.name)
            arrayAux3.splice(index1, 1)
            setCadeiraArray(arrayAux3)
            
        }
        

    }

    

    function reservar(e){
        e.preventDefault();
        
        
        
        //props.alerta(cpf, name, filme, data, hora, cadeiraArray)

        const URL_API = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"

        const objPost = {
            ids: arraySelecionados,
            name: name,
            cpf: cpf
        } 
        
        const promisse = axios.post(URL_API, objPost)
        promisse.then((resposta) => {
            console.log(resposta)
            console.log("salva")
            navigate(`/sucesso`, {state:{cpf, name, filme, data, hora, cadeiraArray}})
            
        })
        promisse.catch(erro => console.log(erro.response.data))
        
    
    }
    


    if (waiting === false){
        return <div>Carregando.....</div>
    }else{

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.seats.map(cadeira => (
                    
                    <SeatItem key={cadeira.id}
                    cadeiraId = {cadeira.id}
                    disponivel = {cadeira.isAvailable}
                    arraySelecionados = {arraySelecionados}
                    onClick={()=> selecionarCadeira(cadeira)}
                    data-test="seat"
                    >
                    {cadeira.name}
                    </SeatItem>
                    
                  
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle  verde = {true}
                                    amarelo = {false}
                                    cinza = {false}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle verde = {false}
                                    amarelo = {false}
                                    cinza = {true}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle verde = {false}
                                    amarelo = {true}
                                    cinza = {false}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>


           
                <FormContainer onSubmit={reservar}>
                    
                <label htmlFor="name"> Nome do Comprador:</label>
                    <input data-test="client-name" required placeholder="Digite seu nome..." id="name" value={name} onChange={(e)=> setName(e.target.value)}/>

                    <label htmlFor="cpf">  CPF do Comprador:</label>
                    <input pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" data-test="client-cpf" required placeholder="Digite seu CPF..." id="cpf"  value={cpf} onChange={(e)=> setCpf(e.target.value)}/>
                    
                   
                    <button disabled = {false} type="submit" data-test="book-seat-btn" >Reservar Assento(s)</button>
                   
                </FormContainer>
           


            
            <FooterContainer data-test="footer">
                <div>
                    <img src={seats.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.date} - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
    }
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => (props.verde === true ? "#0E7D71": props.amarelo === true ? "#F7C52B" : props.cinza === true ? "#7B8B99" :"")};
    background-color: ${props => (props.verde === true ? "#1AAE9E": props.amarelo === true ? "#FBE192D9" : props.cinza === true ? "#C3CFD9" :"")};   
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => (props.disponivel === false ? "#F7C52B" : "#7B8B99")};
    background-color: ${props => (props.disponivel === false ? "#FBE192" : props.arraySelecionados.includes(props.cadeiraId) ? "#1AAE9E" : "#C3CFD9")};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`