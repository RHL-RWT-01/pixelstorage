import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import UploadImage from "./components/Uploadimage";
// import ImageDecryption from "./components/ImageDecryption";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <Home />
        {/* <Signup /> */}
        <br/>
        {/* <Login /> */}
        {/* <UploadImage />
        <ImageDecryption /> */}
      </nav>
    </>
  );
}

export default App;
