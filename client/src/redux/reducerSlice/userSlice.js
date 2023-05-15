import { createSlice } from '@reduxjs/toolkit';
//redux -> user: u
const initialState = {
  token: '',
  role: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
    state.token= action.payload 
    },
    setRole: (state, action) => {
      state.role= action.payload 
      },
    logout:  (state, action) => {
        return {
          ...initialState
        }
     },
  },
});




export const { setToken ,setRole,logout} = userSlice.actions;
export default userSlice.reducer;