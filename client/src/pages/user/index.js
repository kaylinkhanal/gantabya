import {useState, useEffect, useRef} from 'react';
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCar } from 'react-icons/ai';
import {MdPedalBike } from 'react-icons/md';
import { GoogleMap, LoadScript,MarkerF, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import {setPickUpCoords, setPickUpAddr} from '../../redux/reducerSlice/locationSlice'
import { getDistance } from 'geolib';
import { io } from 'socket.io-client';
import { Avatar,Modal, Input,Button } from 'antd';
import priceMap from '../../config/priceMap.json'
const socket = io('http://localhost:4000/');
import {setDestinationCoords, setDestinationAddr} from '../../redux/reducerSlice/locationSlice'
const Home = ()=> {
  const dispatch = useDispatch()
  const [rideType, setRideType] = useState('bike')
  const [price, setPrice] = useState(priceMap[rideType].basePrice)
  const [distance, setDistance] = useState(0)

  const {role,id} =useSelector(state=> state.user)
  const inputRef = useRef(null)
  const {pickUpCoords, pickUpAddress, destinationCoords, destinationAddress} =useSelector(state=> state.location)

  const [pickupInputField, setPickUpInputField] = useState('')
  const [destinationInputField, setDestinationInputField] = useState('')

  useEffect(()=>{
    socket.on('connection')
  },[])
  useEffect(()=>{
    // const distance = (getDistance(pickUpCoords, destinationCoords) / 1000).toFixed(2);
    const distance = Math.ceil(getDistance(pickUpCoords, destinationCoords) / 1000);

  //  const distance = getDistance(pickUpCoords,destinationCoords )/1000 
   setDistance(distance)
  //  const price = distance  * priceMap[rideType].unitKmPrice
  // const price = (distance * priceMap[rideType].unitKmPrice).toFixed(2);
   const price = Math.ceil(distance * priceMap[rideType].unitKmPrice);

   if(price < priceMap[rideType].basePrice){
    setPrice(priceMap[rideType].basePrice)
   }else{
    setPrice(price)
   }
  },[pickUpCoords.lat, destinationCoords.lat, rideType])


  const { isLoaded, loadError } = useJsApiLoader({
    libraries: ['places'],
    googleMapsApiKey: "AIzaSyDLfjmFgDEt9_G2LXVyP61MZtVHE2M3H-0" 
  })

  const containerStyle = {
    width: '100vw',
    height: '100vh'
  };

  const center = {
    lat: 27.690551245186235,
    lng: 85.3466481712005
  };

  


  
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  const assignPickUpLocation = (val)=> {
    const latLngObj = {
      lat: val.latLng.lat(),
      lng: val.latLng.lng(),
    }
    dispatch(setPickUpCoords(latLngObj))
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${val.latLng.lat()}&lon=${val.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
    .then(res=> res.json())
    .then(data=> dispatch(setPickUpAddr(data.features[0].properties.formatted)))
  }




  const selectLocation = ()=>{ 
    dispatch(setPickUpAddr(inputRef?.current.value))
  }

  const assignDestinationLocation = (val)=> {
    debugger;
    const latLngObj = {
      lat: val.latLng.lat(),
      lng: val.latLng.lng(),
    }
    dispatch(setDestinationCoords(latLngObj))
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${val.latLng.lat()}&lon=${val.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
    .then(res=> res.json())
    .then(data=> dispatch(setDestinationAddr(data?.features[0]?.properties?.formatted)))
  } 

  const reducePrice= () => {
  
    const newPrice = price-1
    const percentageChange =(newPrice-priceMap[rideType].basePrice)/priceMap[rideType].basePrice * 100
    if(percentageChange > -10){
      setPrice(price-1)
    }
  }


  const sendPickupRequest = async()=> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickUpCoords, pickUpAddress, destinationCoords, destinationAddress, userId:id ,role, distance, price  })
    };
    try {
      const res = await fetch('http://localhost:4000/rides', requestOptions)
      const data = await res.json()
      if(data){
        alert("your pickup request is submitted")
      }
  }catch(err){
    alert("sth went wrong")
  }
    socket.emit('rideRequest',{ pickUpCoords, pickUpAddress, destinationCoords, destinationAddress, userId:id ,role  })


}
  
  
    return (
        
        <div style={{textAlign:'center'}}>
         
          {isLoaded ? (
              <div>
          
                  <Autocomplete
               key={1}
               onPlaceChanged= {(val)=> selectLocation()}
              >
              <div>
               <div style={{
                backgroundColor:'wheat', 
                position:'absolute', 
                zIndex:4, 
                height:'auto',
                width:'400px', 
                marginLeft:'1250px', 
                borderColor:'green',
                border:'1px',
                 borderRadius:'40px'}}> 
         
          
           
              
                <h1> Choose Your Destination</h1>
                <input style={{ height:'30px', width:'390px'}}
                
                value={pickUpAddress}
                ref={inputRef}
                placeholder="Travelling From" onChange={(e)=> dispatch(setPickUpAddr(e.target.value))}
                />
                 <input style={{ height:'30px', width:'390px'}}
                
                value={destinationAddress}
                
                placeholder="Travelling To" onChange={(e)=> dispatch(setDestinationAddr(e.target.value))}
                />
                Choose Vehicles Types<br/>
                
                  <AiFillCar onClick={()=>setRideType('car')}
                    style={{height:45,width:66, background: rideType=='car' ? 'blue' : null}} />
                  
                  <MdPedalBike className='avatar' onClick={()=>setRideType('bike')}
                    style={{height:45,width:66, background: rideType=='bike' ? 'green' : null}}/>
                    <hr/>
                Estimated Price <Button onClick={()=>setPrice(price+1)}>+</Button>{price}<Button onClick={reducePrice}>-</Button>
                <br/>  You are Travelling {distance} K.M
                <hr/>
                  <Button onClick={sendPickupRequest}>
                Send pickup request
                </Button> <br/>   
                        
                </div></div>
              </Autocomplete>

             
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
              >
                  <MarkerF
                    onLoad={onLoad}
                    onDragEnd= {assignPickUpLocation}
                    draggable= {true}
                    position= {pickUpCoords}
                  />
                     
                     
                     
                     <MarkerF
                     onLoad={onLoad}
                     draggable= {true}
                     onDragEnd={assignDestinationLocation}
                     position={destinationCoords}
                      icon={{
                    path:"M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                     fillColor: "green",
                    fillOpacity: 0.9,
                      scale: 2,
                       strokeColor: "gold",
                      strokeWeight: 8,
                          }}
                           />
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
              </GoogleMap>
           
                </div>
          ) : "Loading ...."}
          Your pickup address is:  {pickUpAddress}
          <button >Confirm pickup address</button>
          <br/>

          Your destination address is: {destinationAddress}
          <button>Confirm destination address</button>

           </div>
          
    )
}

export default Home