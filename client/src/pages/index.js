import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

const Home = ()=> {
  const [ phoneNumber, setPhoneNumber] = useState('')
  const [ password, setPassword] = useState('')

  const handleLogin = async()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: phoneNumber, password:password })
  };
    const data = await fetch('http://localhost:4000/login',requestOptions)
  }
  return (
    <>
            <input placeholder="Mobile Number" onChange={(e)=>setPhoneNumber(e.target.value)}/>
            <input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            <br/>
            Don't have an account yet? <Link href="/register">Sign Up</Link> instead 
    </>
  )
}

export default Home