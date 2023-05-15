import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import UserDashBoard from './user'
import RiderDashBoard from './rider'

import Login from './login'
import Navbar from '../components/Nav'
import { useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })
const Main = () => {
  const { token, role } = useSelector(state => state.user)

  const Dashboard = ()=> {
    switch(role){
      case 'rider': 
        return  <RiderDashBoard/>
      case 'user':
        return <UserDashBoard/>
    }
   
  }

  const Auth = ()=> {
    return (
      <Login/>
    )
  }
  return (
    <div>
      {role}
      <Navbar/>
      {token ? <Dashboard/> : <Auth/>}
    </div>
  )
}


export default Main;
