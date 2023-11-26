import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import { ContextProvider } from "./pages/context/context";

function App() {
  return (
   <BrowserRouter>
   <ContextProvider>
   <Routes>
    <Route path="/" Component={Login} />
    <Route path="/home" Component={Home} />
   </Routes>
   </ContextProvider>
 
   </BrowserRouter>
  );
}

export default App;
