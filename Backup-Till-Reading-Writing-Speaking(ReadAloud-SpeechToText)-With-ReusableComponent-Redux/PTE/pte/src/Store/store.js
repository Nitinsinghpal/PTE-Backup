import { configureStore } from '@reduxjs/toolkit'
import countDownReducer from '../Components/CommonComponents/Countdown/countDownSlice'
import recordingReducer from '../Components/CommonComponents/Recording/recordingSlice'
export const store = configureStore({
  reducer: {
    countDown:countDownReducer,
    recording:recordingReducer
  },
})