import { BrowserRouter, Route, Routes } from "react-router-dom";
import Left from "./Left";
import Signin from "./Signin";
import Alldeps from "./Alldeps";

export default function App() {
  return (
    <BrowserRouter>

    <Routes>

      <Route path="/" element={<Signin />}/>
      <Route path="/allusers" element={<Alldeps />}/>
      <Route path="/home" element={<Left />}/>
    </Routes>
    
    </BrowserRouter>
  )
}
