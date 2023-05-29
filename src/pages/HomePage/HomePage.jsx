import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

export default function HomePage() {
    const [arrayMovies, setArrayMovies] = useState([]);
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        const promisse = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
        promisse.then((resposta) => {
            setArrayMovies(resposta.data);
            setWaiting(true)
        });
        promisse.catch((erro) => {
            console.log(erro.response.data);
        });
    },[]);

    
    if(arrayMovies.length == 0){
        
         return <Loading></Loading>
        
    }else{
    
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {arrayMovies.map(movie => (
                    <Link data-test="movie" to={`/sessoes/${movie.id}`} key={movie.id}>

                        <MovieContainer >                        
                            <img src={movie.posterURL} alt="poster"/>                       
                        </MovieContainer>

                    </Link>
                ))} 
            </ListContainer>

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
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`