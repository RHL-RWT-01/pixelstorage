import React from 'react'
import "tailwindcss";
function Home() {
  return (
    <>
    <div style={{ 
        height: '1000px',
        width: '100%',
        backgroundColor: "rgba(48, 35, 219, 0.8)",
    }} >
      <h1 >Welcome to Pixel Storage</h1>
      <p >
        Pixel Storage is a secure and efficient image storage solution that allows you to store,
        share, and retrieve images with high security and privacy.
      </p>
      <button>Get Started</button>
      </div>
    </>
  )
}

export default Home