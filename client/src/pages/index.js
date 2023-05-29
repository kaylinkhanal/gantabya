import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import UserDashBoard from './user'
import RiderDashBoard from './rider'
import AdminDashBoard from './admin'

import Login from './login'
// import Navbar from '../components/Nav'
import CustomDrawer from '../components/Drawer'
import { useSelector } from 'react-redux'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
const Main = () => {
  const { token, role } = useSelector(state => state.user)

  const Dashboard = ()=> {
    switch(role){
      case 'rider': 
        return  <RiderDashBoard/>
      case 'user':
        return <UserDashBoard/>
      case 'admin':
        return <AdminDashBoard/>
    }
   
  }

  const Auth = ()=> {
    return (
      <Login/>
    )
  }
  return (
    <div>
      {role ? <CustomDrawer/>: null }
      {token ? <Dashboard/> : <Auth/>}
    </div>
  )
}


export default Main;
