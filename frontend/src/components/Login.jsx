import React,{useState} from 'react'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response= await fetch(`http://localhost:8080/api/user/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,password})
            });
            localStorage.setItem('token',response.token);
            alert(response.message);
        }catch(e){
            alert('Error logging in');
        }
    }



  return (
    <>
     <h2>Login</h2>
     <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <br></br>
        <br></br>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br></br>
        <br></br>
        <button type="submit">Login</button>
     </form>
    </>
  )
}

export default Login