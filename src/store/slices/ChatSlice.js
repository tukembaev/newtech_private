import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employee: [],
  chats: [],
  messageId: [],
  messagechat: [],
  message: '',
}

const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employee = action.payload.employee
    },
    setChats: (state, action) => {
      state.chats = action.payload.chats
    },
    setChatById: (state, action) => {
      state.messageId = action.payload.messageId
    },

    setMessageChat: (state, action) => {
      state.messagechat = action.payload.messagechat
    },
    postMessageToChat(state, action) {
      state.message = action.payload.message
    },
  },
})

export const {
  setEmployees,
  setChats,
  setChatById,
  setMessageChat,
  postMessageToChat,
} = ChatSlice.actions

export default ChatSlice.reducer
