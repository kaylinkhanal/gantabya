import { createSlice } from '@reduxjs/toolkit';
//redux -> user: u
const initialState = {
  pickUpCoords: {
    lat: 27.690551245186235,
    lng: 85.3466481712005
  },
  destinationCoords: {
    lat: 27.690551245186235,
    lng: 85.3466481712005
  },
  pickUpAddress: '',
  destinationAdddress: ''
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
       
     },
  },
});




export const { setPickUpCoords, setDestinationCoords, setPickUpAddr} = locationSlice.actions;
export default locationSlice.reducer;