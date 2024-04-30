import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userCalendar: [],
  companyCalendar: [],
}

const CalendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setUserEvents: (state, action) => {
      state.userCalendar = action.payload.userCalendar
    },
    setCompanyEvents: (state, action) => {
      state.companyCalendar = action.payload.companyCalendar
    },
    postEvent(state, action) {
      state.title = action.payload.title
      state.description = action.payload.description
      state.color = action.payload.color
      state.start = action.payload.start
      state.end = action.payload.end
    },
  },
})

export const { setUserEvents, postEvent, setCompanyEvents } =
  CalendarSlice.actions

export default CalendarSlice.reducer
