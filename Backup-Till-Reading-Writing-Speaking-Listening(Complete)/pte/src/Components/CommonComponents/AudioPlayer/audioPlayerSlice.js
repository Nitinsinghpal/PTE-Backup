import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active: true,
  reset:""
}

export const audioPlayerSlice = createSlice({
  name: 'audioPlayer', 
  initialState,
  reducers: {
    startAudioPlayer: (state,action) => {
      state.active = action.payload
    },
    resetAudioPlayer: (state,action) => {
      state.reset = action.payload.reset
    }
  },
})

// Action creators are generated for each case reducer function
export const { startAudioPlayer,resetAudioPlayer } = audioPlayerSlice.actions

export default audioPlayerSlice.reducer