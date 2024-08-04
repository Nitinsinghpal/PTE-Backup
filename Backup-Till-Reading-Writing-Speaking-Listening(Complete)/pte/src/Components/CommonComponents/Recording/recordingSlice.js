import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active: true,
  transcript:""
}

export const recordingSlice = createSlice({
  name: 'recording', 
  initialState,
  reducers: {
    startRecording: (state,action) => {
      state.active = action.payload
    },
    stopRecording: (state,action) => {
       state.active = action.payload
    },
    transcriptData: (state,action) => {
      
      state.transcript = action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const { startRecording,stopRecording,transcriptData } = recordingSlice.actions

export default recordingSlice.reducer