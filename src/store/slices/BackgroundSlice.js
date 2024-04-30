import { createSlice } from '@reduxjs/toolkit'
import air from 'assets/img/air.jpg'

const initialState = {
  background: air,
}

const BackgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBackground: (state, action) => {
      state.background = action.payload.background
    },
  },
})

export const { setBackground } = BackgroundSlice.actions

export default BackgroundSlice.reducer
