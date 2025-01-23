import { useState } from "react";

import Home from "./components/Home";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Home />
        <Signup /> 
        <br />
        <Login />
        <UploadImage /> 
        <ImageDecryption />
      </BrowserRouter>
    </>
  );
}

export default App;
