import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allStatistic: [],
  timeTracker: [],
  empUserId: '',
}

const StatisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setAllStatistic: (state, action) => {
      state.allStatistic = action.payload.allStatistic
    },
    setStatisticUserId: (state, action) => {
      state.empUserId = action.payload.empUserId
    },
    setTimeData: (state, action) => {
      state.timeTracker = action.payload.timeTracker
    },
  },
})

export const { setAllStatistic, setStatisticUserId, setTimeData } =
  StatisticSlice.actions

export default StatisticSlice.reducer
