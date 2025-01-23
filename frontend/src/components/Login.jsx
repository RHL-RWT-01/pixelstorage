import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:username, password:password }),
      });
      localStorage.setItem("token", response.token);
      alert(response.message);
    } catch (e) {
      alert("Error logging in");
    }
  };

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100%",
        margin: "auto",
        backgroundColor: "rgba(201, 17, 225, 0.8)",
        borderRadius: "10px",
        boxShadow: "4px 4px 10px rgba(248, 13, 201, 0.8)",
      }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <br></br>
          <button 
          style={{
            backgroundColor: "rgba(135, 58, 137, 0.8)",
            color: "white",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
