import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  personal_info: [],
  Europass: [],
  user_change: [],
}

const PersonalCard = createSlice({
  name: 'personalcard',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personal_info = action.payload.personal_info
    },
    setEuropass: (state, action) => {
      state.Europass = action.payload.Europass
    },
    setUser_change: (state, action) => {
      state.user_change = action.payload.user_change
    },
  },
})

export const { setPersonalInfo, setEuropass, setUser_change } =
  PersonalCard.actions

export default PersonalCard.reducer
