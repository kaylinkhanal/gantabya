'use client'
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';
import { Col, Row } from 'antd';
export default function Page() {
  const router = useRouter();
  const [rideDetails, setRideDetails] = useState({})
  useEffect(()=>{
    fetchRidesDetails()
  }, [])
  const fetchRidesDetails = async() => {
         const res= await fetch('http://localhost:4000/rides/'+router.query.id)
         const data=  await res.json()
         if(data){
          setRideDetails(data.rideList)
         }
  }
  return (
    
    <div>
      <h1>Ride Details</h1>
        <Row>
        <Col span={8}> PickUp Address: <p>{rideDetails?.pickUpAddress}</p></Col>
        <Col span={8}> Destination Address: <p>{rideDetails?.destinationAddress}</p></Col>
    </Row>
    <Row>
        <Col span={8}> Full Name: <p>{rideDetails?.userId?.[0]?.fullName}</p></Col>
        <Col span={8}> Phone Number: <p>{rideDetails?.userId?.[0]?.phoneNumber}</p></Col>
    </Row>
    <button onClick={()=> acceptRide()}>Accept</button>
    </div>
  )
}