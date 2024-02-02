import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie"

const authSlice = createSlice({
    name: 'user',
    initialState: {
      isAuthorized: Cookies.get('isAuthorized') === 'true'
    },
    reducers: {
      setAuthorized: (state, action)=>{
        state.isAuthorized  = action.payload
        Cookies.set('isAuthorized', action.payload);
    },
  
    },
  });

  export const { setAuthorized} = authSlice.actions;
  export default authSlice.reducer;