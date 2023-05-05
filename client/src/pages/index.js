import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSelector } from 'react-redux'
import {useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import {setToken} from '../redux/reducerSlice/userSlice'

const Home = ()=> {
  const [ phoneNumber, setPhoneNumber] = useState('')
  const [ password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = async()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: phoneNumber, password:password })
  };
    const res = await fetch('http://localhost:4000/login',requestOptions)
    const data = await res.json()
    if(data){
      console.log(data.token)
    }
  }
  return (
    <>
            <input placeholder="Mobile Number" onChange={(e)=>setPhoneNumber(e.target.value)}/>
            <input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className={styles.Btn} onClick={handleLogin}>Login</button>
            <br/>
            Don't have an account yet? <Link href="/register">Sign Up</Link> instead 
    </>
  )
}

export default Home