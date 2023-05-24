import {useState} from 'react';
import { logout,setToken,setRole } from '../../redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript,MarkerF, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import {setPickUpCoords, setPickUpAddr} from '../../redux/reducerSlice/locationSlice'
const Home = ()=> {
  const dispatch = useDispatch()
  const {role} =useSelector(state=> state.user)
  const {pickUpCoords, pickUpAddress} =useSelector(state=> state.location)
  const [pickupInputField, setPickUpInputField] = useState('')
 
  const { isLoaded, loadError } = useJsApiLoader({
    libraries: ['places'],
    googleMapsApiKey: "" 
  })

  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: 27.690551245186235,
    lng: 85.3466481712005
  };


  
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  const assignLocation = (val)=> {
    const latLngObj = {
      lat: val.latLng.lat(),
      lng: val.latLng.lng(),
    }
    dispatch(setPickUpCoords(latLngObj))
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${val.latLng.lat()}&lon=${val.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
    .then(res=> res.json())
    .then(data=> dispatch(setPickUpAddr(data.features[0].properties.formatted)))
  }

    return (
        <div style={{textAlign:'center'}}>
          {isLoaded ? (
              <div>
                
           {pickupInputField}
              <Autocomplete
               key={1}
               onPlaceChanged= {(val)=> console.log(val)}
              >
                <input 
                value={pickupInputField}
                
                placeholder="enter pick up location" onChange={(e)=>setPickUpInputField(e.target.value)}/>
              </Autocomplete>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
              >
                  <MarkerF
                    onLoad={onLoad}
                    onDragEnd= {assignLocation}
                    draggable= {true}
                    position= {pickUpCoords}
                  />
                   <MarkerF
                    onLoad={onLoad}
                    onDragEnd= {assignLocation}
                    draggable= {true}
                    position= {pickUpCoords}
                  />
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
              </GoogleMap>
           
                </div>
          ) : "Loading ...."}
          Your pickup address is:  {pickUpAddress}
          <button >Confirm pickup address</button>

           </div>
    )
}

export default Home