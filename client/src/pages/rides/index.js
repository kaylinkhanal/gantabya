import {useEffect, useState} from 'react'
import { Skeleton } from 'antd';
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card'
import { Pagination } from 'antd';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4000/');
export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:4000/rides')
  const data = await res.json()
  return { props: { data } }
}
  

const Home = (props)=> { 
  console.log(props.data.ridesList)
    return (
        <div style={{textAlign:'center'}}>
          {props.data.ridesList.map((item)=>{
            return (<li>{item.pickUpAddress}</li>)
          })}
      </div>
    )
}

export default Home