import React, { useState } from "react";

function ImageDecryption() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });
      alert("successfully decrypted");
    } catch (e) {
      alert("decryption failed");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Decrypt</button>
        </form>
      </div>
    </>
  );
}

export default ImageDecryption;
