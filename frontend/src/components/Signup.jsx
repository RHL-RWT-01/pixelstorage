import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      alert(response.message);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        margin: "auto",
        height: "25vh",
        padding: "20px",
        backgroundColor: "rgba(17, 83, 225, 0.8)",
        borderRadius: "10px",
        boxShadow: "4px 4px 10px rgba(13, 60, 248, 0.8)"
       }}>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button style={{
            backgroundColor: "rgba(20, 54, 128, 0.8)",
            color: "white",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
           type="submit">Signup</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
