import {useState, useEffect, useRef} from 'react';
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript,MarkerF, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import {setPickUpCoords, setPickUpAddr} from '../../redux/reducerSlice/locationSlice'
import { getDistance } from 'geolib';
import { io } from 'socket.io-client';
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
   const distance = getDistance(pickUpCoords,destinationCoords )/1000 
   setDistance(distance)
   const price = distance  * priceMap[rideType].unitKmPrice
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
          price is <button onClick={()=>setPrice(price+1)}>+</button>{price}<button onClick={reducePrice}>-</button>
          distance is {distance}
          <button onClick={()=>setRideType('car')}
            style={{background: rideType=='car' ? 'blue' : null}}
          >Car</button>
          <button onClick={()=>setRideType('bike')}
             style={{background: rideType=='bike' ? 'blue' : null}}
          >Bike</button>

          {isLoaded ? (
              <div>
               
              <Autocomplete
               key={1}
               onPlaceChanged= {(val)=> selectLocation()}
              >
                <input 
                value={pickUpAddress}
                ref={inputRef}
                placeholder="enter pick up location" onChange={(e)=> dispatch(setPickUpAddr(e.target.value))}
                />
              </Autocomplete>
              <button onClick={sendPickupRequest}>
                Send pickup request
                </button>
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