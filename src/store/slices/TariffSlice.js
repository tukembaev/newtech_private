import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  myTariff: [],
  allTariffs: [],
  tariffOrders: [],
}

const TariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {
    setMyTariff: (state, action) => {
      state.myTariff = action.payload.myTariff
    },
    setAvailableTariffs: (state, action) => {
      state.allTariffs = action.payload.allTariffs
    },
    setOrderTariffs: (state, action) => {
      state.tariffOrders = action.payload.tariffOrders
    },
  },
})

export const { setMyTariff, setAvailableTariffs, setOrderTariffs } =
  TariffSlice.actions

export default TariffSlice.reducer
