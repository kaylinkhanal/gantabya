import {useEffect, useState} from 'react'
import { Skeleton } from 'antd';
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card'
import { Pagination } from 'antd';
const Home = ()=> { 
  const [ridesList, setRideList] = useState([])
  const fetchRides = async(page=1)=>{
      const res = await fetch('http://localhost:4000/rides?status=pending&page='+page)
      const data= await res.json()
      if(data){
        setRideList(data.ridesList)
      }
  }
  useEffect(()=>{
    fetchRides()
  },[])
  const {role} =useSelector(state=> state.user)
    return (
        <div style={{textAlign:'center'}}>
          <h1> Hello {role} </h1>
          
          {ridesList.length> 0 ? ridesList.map((item)=>{
            return( <Card item={item}/>)
          }) : <Skeleton />}
          <Pagination defaultCurrent={0} total={10} pageSize={2} onChange={(page)=>fetchRides(page)}/>
       
      </div>
    )
}

export default Home