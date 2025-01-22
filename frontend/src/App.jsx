import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UploadImage from "./components/Uploadimage";
import ImageDecryption from "./components/ImageDecryption";
import { NavLink } from "react-router";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <Signup />
        <Login />
        <UploadImage />
        <ImageDecryption />
      </nav>
    </>
  );
}

export default App;
