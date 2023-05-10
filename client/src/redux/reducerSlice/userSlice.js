import { createSlice } from '@reduxjs/toolkit';

const initialToken = {
  token: ''
  
};

export const userSlice = createSlice({
  name: 'user',
  initialToken,
  reducers: {
    setToken: (state, action) => {
    state.token= action.payload 
  
    },
  
  },
});




export const { setToken } = userSlice.actions;
export default userSlice.reducer;