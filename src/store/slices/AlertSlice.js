import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alerts: [],
  alertsMessages: [],
  news: [],
  newsId: [],
}

const AlertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertById: (state, action) => {
      state.alerts = action.payload.alerts
    },
    setAlertMessagesById: (state, action) => {
      state.alertsMessages = action.payload.alertsMessages
    },

    setNews: (state, action) => {
      state.news = action.payload.news
    },
    setNewsId: (state, action) => {
      state.newsId = action.payload.newsId
    },
    postNewNews(state, action) {
      state.title = action.payload.title
      state.description = action.payload.description
    },
  },
})

export const {
  setAlertById,
  setNews,
  setNewsId,
  postNewNews,
  setAlertMessagesById,
} = AlertSlice.actions

export default AlertSlice.reducer
