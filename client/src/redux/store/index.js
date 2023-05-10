import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {userSlice} from "../reducerSlice/userSlice" 
const makeStore = () =>

  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    
    }
  });

export const wrapper = createWrapper(makeStore);