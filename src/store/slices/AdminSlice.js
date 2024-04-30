import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: [],
}

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    postRegisterUser(state, action) {
      state.gender = action.payload.gender
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.middle_name = action.payload.middle_name

      state.data_of_birth = action.payload.data_of_birth
      state.number_phone = action.payload.number_phone
      state.email = action.payload.email
      state.citizenship = action.payload.citizenship

      state.position = action.payload.position
      state.inn = action.payload.inn
      state.password = action.payload.password
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
  },
})

export const {
  postRegisterUser,
  setPositionById,
  setTopPositionById,
  setPositionEmpById,
} = AdminSlice.actions

export default AdminSlice.reducer
