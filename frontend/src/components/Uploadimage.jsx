import React,{useState} from 'react'

function UploadImage() {
    const[file,setFile]=useState(null)

    const handleFileChange=(e)=>{
        setFile(e.target.files[0])
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        
        if(!file){
          alert('Please select an image')
          return;
        }
        const formData=new FormData();
        formData.append('file',file);
        try{
          const token= localStorage.getItem('token');
          const response=await fetch('http://localhost:5000/upload',{
            method:'POST',
            headers:{
              'Authorization':'Bearer '+token
            },
          })
          alert("Image Upload Successful")
        }catch(e) {
          alert("Image Upload Failed")
        }
    };


  return (
    <>
      <h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </h2>
    </>
  )
}

export default UploadImage