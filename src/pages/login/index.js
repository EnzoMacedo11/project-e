import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import io from "socket.io-client"

import { SocketContext } from "../context/context";
export default function Login(){
    const {setSocket,setUserName} = useContext(SocketContext)
    const[name,setName] =useState("")
    const navigate = useNavigate()

    async function sendForm() {
        const socket = await io.connect('http://localhost:3001');
        socket.emit('set_username', name)
        setSocket(socket)
        setUserName(name)
        navigate("/home");
        
      }

    function onPressEnter(event){
        if(event.key === "Enter"){
            sendForm()
        }  
    }


    return (
        <Container>
            <Main>
                <LoginText>
                    Insira seu nome! 
                </LoginText>
                <NameInput value={name} onKeyDown={onPressEnter} onChange={(e)=>setName(e.target.value)}/>
                <SendButton onClick={()=>sendForm()} >Enviar</SendButton>
            </Main>
               
        </Container>
    )
}


const Container = styled.div`
  display: flex;
  height:100vh;
  width:100%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #003366, #66ccff);
`;

const Main = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:40%;
height:80%;
border-radius:20px;
background-color:whitesmoke;
opacity:90%;


`
const ScrollView = styled.div`
  overflow: auto; 
  width: 100%;
  height: 95%;
`;

const LoginText = styled.text`
font-size:36px;
color:#003366;
`

const NameInput = styled.input`
margin-top:15px;
width:50%;
height:5%;
border-radius:15px;
padding-left:20px;
font-size:16px;
`
const SendButton = styled.button`
width:15%;
height:4%;
margin-top:15px;
border-radius:15px;
background-color:#003366;
display:flex;
justify-content:center;
align-items:center;
color:whitesmoke;
`