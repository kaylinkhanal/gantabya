import {useEffect, useState} from 'react'
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card'
const Home = ()=> { 
  const [ridesList, setRideList] = useState([])
  const fetchRides = async()=>{
      const res = await fetch('http://localhost:4000/rides')
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
            return( <div className="card" >
              <Card/>
              </div>)
          }) : null}
       
      </div>
    )
}

export default Home