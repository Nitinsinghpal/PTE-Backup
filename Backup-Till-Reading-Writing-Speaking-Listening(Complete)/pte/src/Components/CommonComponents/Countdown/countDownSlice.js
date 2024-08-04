import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active: true,
  reset:""
}

export const countDownSlice = createSlice({
  name: 'countDown', 
  initialState,
  reducers: {
    startStopCountDown: (state,action) => {
      state.active = action.payload
    },
    resetCountDown: (state,action) => {
      state.reset = action.payload.reset
    }
  },
})

// Action creators are generated for each case reducer function
export const { startStopCountDown,resetCountDown } = countDownSlice.actions

export default countDownSlice.reducer