import {useEffect, useState} from 'react'
import { Skeleton } from 'antd';
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card'
import { Pagination } from 'antd';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4000/');
import { useRouter } from "next/router";
import styles from '@/styles/Home.module.css'

const Home = ()=> { 
  const router = useRouter();
  const [ridesList, setRideList] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const fetchRides = async(page=1, searchText)=>{
      const res = await fetch(`http://localhost:4000/rides?status=pending&page=${page}&searchText=${searchText}`)
      const data= await res.json()
      if(data){
        setRideList(data.ridesList)
        setTotalPage(data.totalCount)
      }
  }
  useEffect(()=>{

    fetchRides()
  },[])

  useEffect(()=>{
    socket.on('rideRequest', (rideList)=>{
      setRideList(rideList)
    })
  })
  const searchNewList =(e)=>{
    fetchRides(1, e.target.value)
  }
  
  const {role} =useSelector(state=> state.user)
    return (


 
        <div style={{textAlign:'center'}}>
          <div className={styles.backgroundrider}>
        <h1> Available Rides </h1>


          
          {ridesList?.length> 0 ? ridesList.map((item)=>{
            return( <Card item={item} fetchRides={fetchRides}/>)
          }) : <Skeleton />}
          <Pagination defaultCurrent={1}   total={totalPage} pageSize={5} onChange={(page)=>fetchRides(page)}/>
       
      </div>
      </div>
    )
}

export default Home