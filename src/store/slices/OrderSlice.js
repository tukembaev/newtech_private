import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  orderId: [],
  position: [],
  posempl: [],
  top_position: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.orders
    },
    setOrderById: (state, action) => {
      state.orderId = action.payload.orderId
    },
    setPatchedOrder: (state, action) => {
      state.orderId = action.payload
    },
    setPositionById: (state, action) => {
      state.position = action.payload.position
    },
    setTopPositionById: (state, action) => {
      state.top_position = action.payload.top_position
    },
    setPositionEmpById: (state, action) => {
      state.posempl = action.payload.posempl
    },
    postOrder(state, action) {
      state.addressee = action.payload.addressee
      state.members = action.payload.members
      state.file = action.payload.file
      state.uploaded_files = action.payload.uploaded_files
    },
    registerNewOrder(state, action) {
      state.order_date = action.payload.order_date
      state.order_number = action.payload.order_number
      state.file = action.payload.file
    },
  },
})

export const {
  setOrders,
  setOrderById,
  postOrder,
  setPatchedOrder,
  setPositionById,
  setPositionEmpById,
  setTopPositionById,
  registerNewOrder,
} = orderSlice.actions

export default orderSlice.reducer
