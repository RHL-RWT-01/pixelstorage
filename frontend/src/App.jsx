import { useState } from 'react'
import Signup from './components/Signup'
 import Login from './components/Login'
 import UploadImage from './components/Uploadimage'
 import ImageDecryption from './components/ImageDecryption'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to Pixel Storage</h1>

      <Signup/>
      <br/>
      <br/>
      <br/>
      <Login/>
      <br/>
      <br/>
      <br/>
      <UploadImage/>
      <br/>
      <br/>
      <br/>
      <ImageDecryption/>
    </>
  )
}

export default App
