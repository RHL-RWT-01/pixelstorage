import { useState } from 'react'
import Signup from './components/Signup'
 import Login from './components/Login'
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
    </>
  )
}

export default App
