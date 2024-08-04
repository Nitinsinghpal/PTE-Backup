import { configureStore } from '@reduxjs/toolkit'
import countDownReducer from '../Components/CommonComponents/Countdown/countDownSlice'
import recordingReducer from '../Components/CommonComponents/Recording/recordingSlice'
import audioPlayerReducer from '../Components/CommonComponents/AudioPlayer/audioPlayerSlice'
export const store = configureStore({
  reducer: {
    countDown:countDownReducer,
    recording:recordingReducer,
    audioPlayer:audioPlayerReducer
  },
})