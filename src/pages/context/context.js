import React, { createContext, useState } from 'react';

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [socket, setSocket] = useState('');
  const [userName, setUserName] = useState('')

  const contextValues = {
    socket,
    setSocket,
    userName,
    setUserName
  };

  return (
    <SocketContext.Provider value={contextValues}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
