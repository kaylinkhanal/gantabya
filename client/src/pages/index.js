import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import UserPage from './user/user'
import RiderPage from './rider/rider'
import AdminPage from './admin/admin'

import Login from './login'
import Navbar from '../components/Nav'
import { useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })
const Main = () => {
  const { token, role } = useSelector(state => state.user)

  const Dashboard = () => {
    switch (role) {
      case 'rider':
        return <RiderPage />
      case 'user':
        return <UserPage />
      case 'admin':
        return <AdminPage />
    }

  }

  const Auth = () => {
    return (
      <Login />
    )
  }
  return (
    <div>
      {role}
      <Navbar />
      {token ? <Dashboard /> : <Auth />}
    </div>
  )
}


export default Main;