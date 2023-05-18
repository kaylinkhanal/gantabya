import Error from 'next/error';
import React, { useState } from 'react';

import styles from './Register.module.css';

const Register = () => {
  const [file, setFile] = useState(null)
  const handleFileSave =(e)=> {
    setFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append('avatar',file );
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: formData
    };
    try {
      const res = await fetch('http://localhost:4000/upload', requestOptions)
   
    } catch (err) {
      // error tracking tools
      console.log(err)
    }
  }
  return (
    <div className={styles.container}>
            <input type="file" onChange={handleFileSave}/>
            <button onClick={handleSubmit}>Submit</button>
           
    </div>)
}

export default Register;
