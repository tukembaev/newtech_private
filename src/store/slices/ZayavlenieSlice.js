import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employee_zayavlenie: [],
  zayavlenieTypes: [],
  zayavlenieId: [],
  support_message: [],
  chancelleryZayavleniya: [],
  mine_zayavleniya: [],
  commentm: '',
}

const ZayavlenieSlice = createSlice({
  name: 'zayavleniya',
  initialState,
  reducers: {
    setZayavlenieDataById: (state, action) => {
      state.zayavlenieId = action.payload.zayavlenieId
    },

    setEmployeeZayavlenie: (state, action) => {
      state.employee_zayavlenie = action.payload.employee_zayavlenie
    },
    setForMeZayavleniya: (state, action) => {
      state.mine_zayavleniya = action.payload.mine_zayavleniya
    },

    setZayavlenieTypes: (state, action) => {
      state.zayavlenieTypes = action.payload.zayavlenieTypes
    },
    // setSupportEmp: (state, action) => {
    //   state.supportEmp = action.payload.supportEmp;
    // },
    setChancellerysZayavleniya: (state, action) => {
      state.chancelleryZayavleniya = action.payload.chancelleryZayavleniya
    },
    setZayavleniePatch: (state, action) => {
      state.zayavlenieId = action.payload
    },
    createZayavlenie(state, action) {
      state.addressee = action.payload.addressee
      state.type = action.payload.type
      state.text = action.payload.text
      state.file = action.payload.file
    },
    setPatchZayavlenie: (state, action) => {
      state.zayavlenieId.status = action.payload.status
    },
    // setMessageSupportChat(state, action) {
    //   state.support_message = action.payload.support_message;
    // },
    // setUpdatedSupport: (state, action) => {
    //   state.supportId = action.payload;
    // },
    // postMessageToSupportChat(state, action) {
    //   state.commentm = action.payload.commentm;
    // },
  },
})

export const {
  setEmployeeZayavlenie,
  setZayavlenieDataById,
  setSupportByAll,
  createMessageToSupport,
  setZayavlenieTypes,
  setSupportEmp,
  setChancellerysZayavleniya,
  setZayavleniePatch,
  setForMeZayavleniya,
  createZayavlenie,
  setMessageSupportChat,
  postMessageToSupportChat,
  setUpdatedSupport,
  setPatchZayavlenie,
} = ZayavlenieSlice.actions

export default ZayavlenieSlice.reducer
