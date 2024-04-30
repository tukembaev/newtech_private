import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  supportId: [],
  supportAll: [],
  supportEmp: [],
  supportTypes: [],
  support_message: [],
  commentm: '',
}

const SupportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    setSupportById: (state, action) => {
      state.supportId = action.payload.supportId
    },

    setSupportByAll: (state, action) => {
      state.supportAll = action.payload.supportAll
    },

    setSupportTypes: (state, action) => {
      state.supportTypes = action.payload.supportTypes
    },
    setSupportEmp: (state, action) => {
      state.supportEmp = action.payload.supportEmp
    },
    createMessageToSupport(state, action) {
      state.request_type = action.payload.request_type
      state.topic = action.payload.topic
      state.message = action.payload.message
    },
    setMessageSupportChat(state, action) {
      state.support_message = action.payload.support_message
    },
    setUpdatedSupport: (state, action) => {
      state.supportId = action.payload
    },
    postMessageToSupportChat(state, action) {
      state.commentm = action.payload.commentm
    },
  },
})

export const {
  setSupportById,
  setSupportByAll,
  createMessageToSupport,
  setSupportTypes,
  setSupportEmp,
  setMessageSupportChat,
  postMessageToSupportChat,
  setUpdatedSupport,
} = SupportSlice.actions

export default SupportSlice.reducer
