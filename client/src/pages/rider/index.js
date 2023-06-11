import {useEffect, useState} from 'react'
import { Skeleton } from 'antd';
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card'
import { Pagination } from 'antd';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4000/');

const Home = ()=> { 
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
         <input placeholder="search rides" onChange={searchNewList}/>
          
          {ridesList.length> 0 ? ridesList.map((item)=>{
            return( <Card item={item}/>)
          }) : <Skeleton />}
          <Pagination defaultCurrent={0}   total={totalPage} pageSize={5} onChange={(page)=>fetchRides(page)}/>
       
      </div>
    )
}

export default Home