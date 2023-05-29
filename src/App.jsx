import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"


export default function App() {
    axios.defaults.headers.common['Authorization'] = 'FZDhg494Dgn2xZqHQFRsoKcp';

    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [cadeirasCompradas, setCadeirasCompradas] = useState([]);
    const [filme, setFilme] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');


function alerta(props){
    let aux = [...cadeirasCompradas]
    aux = props.cadeiraArray
    
    setCadeirasCompradas(aux)
}

    return (
        <BrowserRouter>
           <NavContainer>
            <Link to='/'>
            CINEFLEX
            </Link>
            </NavContainer>

            <Routes>
                <Route path="/" element= { <HomePage />}/>
                <Route path="/assentos/:idSessao" element= { <SeatsPage alerta = {alerta}
                    cpf ={cpf} setCpf = {setCpf} name = {name} setName = {setName}

                    />}/>
                <Route path="/sessoes/:idFilme" element= { <SessionsPage  />}/>
                <Route path="/sucesso" element= { <SuccessPage cadeirasCompradas = {cadeirasCompradas} 
                    cpf ={cpf} setCpf = {setCpf} name = {name} setName = {setName}
                
                    /> }/>
            </Routes>

        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
