import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  qrs: [],
  qrId: [],
  id: '',
  nameRU: '',
  korpus: '',
  num_audit: '',
}

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    setQr: (state, action) => {
      state.qrs = action.payload.qrs
    },
    setQrData: (state, action) => {
      state.qrId = action.payload.qrId
    },
  },
})

export const { setQr, setQrData } = qrSlice.actions

export default qrSlice.reducer
