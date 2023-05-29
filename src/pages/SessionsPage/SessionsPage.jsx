import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import styled from "styled-components"

export default function SessionsPage() {
    const [waiting, setWaiting] = useState(false);
    const [session, setSession] = useState([]);
    const [object, setObject] = useState({});
    const params = useParams();

    useEffect(() => {
        
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${params.idFilme}/showtimes`);

        promisse.then((sessao) =>{
            setSession(sessao.data.days);
            setObject(sessao.data);
            setWaiting(true)
        });

        promisse.catch((erro) => {
            console.log(erro.response.data);
        })
    });


    if(session.length == 0){
        
        return <Loading></Loading>
       
   }else{
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {session.map((horarios) => (
                    <SessionContainer key={horarios.id} data-test="movie-day" >
                    {horarios.weekday}- {horarios.date}
                    <ButtonsContainer>
                        {horarios.showtimes.map((hora) => (
                            <Link key={hora.id} to={`/assentos/${hora.id}`}>
                            <button data-test="showtime">{hora.name}</button>
                            </Link>
                        ))}
                        
                    </ButtonsContainer>
                    </SessionContainer>
                ))}
               

                
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={object.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{object.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}
}
const Loading = styled.div`
   
    animation: is-rotating 1s infinite;
    border: 6px solid #e5e5e5;
    border-radius: 50%;
    border-top-color: #51d4db;
    height: 50px;
    width: 50px;

    position: absolute;
    top: 50%;
    right: 50%;

    @keyframes is-rotating {
  to {
    transform: rotate(1turn);
  }
}
`
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
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