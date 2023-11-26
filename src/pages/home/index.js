import { useContext, useEffect, useRef, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SocketContext } from "../context/context";

export default function Home() {
const {socket,setSocket,userName} = useContext(SocketContext)
const location = useLocation();
const name = userName
console.log("socekt", name)
console.log(socket)
const scrollViewRef = useRef();
 
  const [message, setMessage] = useState("");
  const [messagesChat,setMessageChat] = useState("")


  useEffect(()=>{
    socket.on('receive_message',data=>{
      setMessageChat((current)=>[...current,data])
    })
    return()=> socket.off('receive_message')
  },[socket])

  useEffect(()=>{
   console.log(messagesChat)
  },[messagesChat])


  useEffect(() => {
    
    scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
  }, [messagesChat]);

  function sendForm() {
 
    socket.emit('message',message)
    
    setMessage("");
  }

  function onPressEnter(event) {
    if (event.key === "Enter") {
      sendForm();
    }
  }

  return (
    <Container>
      <Main>
      <ScrollView ref={scrollViewRef}>
            {messagesChat ? (
                messagesChat.map((c) =>
                socket.id === c.authorId ? (
                  <MessageBox style={{marginLeft:"60%"}} key={c}>
                    <UserText>{c.user}</UserText>
                    <MessageText>{c.text}</MessageText>
                  </MessageBox>
                ) : (
                  <MessageBox key={c}>
                    <UserText>{c.user}</UserText>
                    <MessageText>{c.text}</MessageText>
                  </MessageBox>
                )
              )
            ):(<CenterDiv>Olá {userName} ainda não temos mensagens</CenterDiv>)}
        </ScrollView>
        <InputBox>
          <InputStyle
            value={message}
            onKeyDown={onPressEnter}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite uma mensagem"
          />
          <ButtonBox onClick={() => sendForm()}>
            <FaRegPaperPlane style={{ height: "25px", width: "25px" }} />
          </ButtonBox>
        </InputBox>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #003366, #66ccff);
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content:center;
  align-items: center;
  width: 90%;
  height: 95%;
  border-radius: 20px;

  background-color: #216ed4;
  opacity: 90%;
`;
const ScrollView = styled.div`
  margin-top: 15px;
  overflow: auto;
  width: 100%;
  height: 88%;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const LoginText = styled.text`
  font-size: 36px;
  color: #003366;
`;

const InputStyle = styled.input`
  margin-left: 5%;
  width: 80%;
  height: 40%;
  border-radius: 15px;
  padding-left: 20px;
  font-size: 16px;
  margin-right: 5%;
`;
const SendButton = styled.button`
  width: 15%;
  height: 4%;
  margin-top: 15px;
  border-radius: 15px;
  background-color: #003366;
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
`;
const InputBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  width: 100%;
  height: 10%;
  opacity: 100%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const ButtonBox = styled.div`
  display: flex;
  width: 35px;

  height: 35px;
  justify-content: center;
  align-items: center;
`;

const MessageBox = styled.div`
  width:35%;
  height: 11%;
  right: 0;
  margin-left: 5%;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;
const UserText = styled.text`
  margin-left: 15px;
  margin-top: 15px;
  font-size: 16px;
`;

const MessageText = styled.text`
  margin-left: 20px;
  margin-top: 10px;
  font-size: 22px;
`;

const CenterDiv = styled.div`
display:flex;
height:100%;
font-size:30px;
justify-content:center;
align-items:center;
`