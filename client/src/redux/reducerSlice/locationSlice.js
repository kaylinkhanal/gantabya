import { createSlice } from '@reduxjs/toolkit';
//redux -> user: u
const initialState = {
  pickUpCoords: {
    lat: 27.690551245186235,
    lng: 85.3466481712005
  },
  destinationCoords: {
    lat: 27.6909512831845865,
    lng: 85.3496484712045
  },
  pickUpAddress: '',
  destinationAddress: ''
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setPickUpCoords: (state, action) => {

      return {
        ...state,
        pickUpCoords: action.payload
      }
    },
    setPickUpAddr : (state, action) => {

      return {
        ...state,
        pickUpAddress: action.payload
      }
    },
    
    setDestinationCoords:  (state, action) => {
      return{
        ...state,
        destinationCoords:action.payload
      }  
     },
     setDestinationAddr : (state, action) => {

      return {
        ...state,
        destinationAddress: action.payload
      }
    },
  }
});




export const { setPickUpCoords, setDestinationCoords, setPickUpAddr, setDestinationAddr} = locationSlice.actions;
export default locationSlice.reducer;