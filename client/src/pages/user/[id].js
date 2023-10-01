'use client'
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';
import { Col, message, Row } from 'antd';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

const socket = io('http://localhost:4000/');
export default function Page() {
  const {token } = useSelector(state=>state.user)
  const router = useRouter();
  const [rideDetails, setRideDetails] = useState({})
  useEffect(()=>{
    fetchRidesDetails()
  }, [router.query.id])
  const fetchRidesDetails = async() => {
    try{
      if(router.query?.id){
     
        const headers = { 'Authorization': 'Bearer '+token ,"Content-Type": "application/json",};
        const res= await fetch('http://localhost:4000/rides/'+router.query.id, {headers})
        const data=  await res.json()
        if(data){
         setRideDetails(data.rideList)
        }
      }
    }catch(err){
      console.log(err.message)
    }
        
  }

  const acceptRide = ()=> {
    socket.emit('changeRideStatus',rideDetails._id)
    message.success("You have accepted the ride")
    
  }
  


  const columns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  
  const data = [
    {
      key: '1',
      field: 'PickUp Address',
      value: rideDetails?.pickUpAddress || 'N/A',
    },
    {
      key: '2',
      field: 'Destination Address',
      value: rideDetails?.destinationAddress || 'N/A',
    },
    {
      key: '3',
      field: 'Full Name',
      value: rideDetails?.userId?.[0]?.fullName || 'N/A',
    },
    {
      key: '4',
      field: 'Phone Number',
      value: rideDetails?.userId?.[0]?.phoneNumber || 'N/A',
    },
    {
      key: '5',
      field: 'Price',
      value: rideDetails?.price || 'N/A',
    },
    {
      key: '6',
      field: 'Vehicle Type:',
      value: rideDetails?.vehicleType || 'N/A',
    },
 
  ];
  return (
    <div>
    <h1>Ride Details</h1>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false} // If you don't want pagination
    />
    <button onClick={() => acceptRide()}>Accept</button>
  </div>
  )
}