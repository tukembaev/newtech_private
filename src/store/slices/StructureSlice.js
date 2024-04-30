import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  myStructures: [],
  structureInfo: [],
  sended: [],
  structure_positions: [],
  structure_employees: [],
}

const StructureSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setAllMineStructure: (state, action) => {
      state.myStructures = action.payload.myStructures
    },
    setStructureInfoById: (state, action) => {
      state.structureInfo = action.payload.structureInfo
    },
    setPositionOfStructureById: (state, action) => {
      state.structure_positions = action.payload.structure_positions
    },
    setEmpOfStructureById: (state, action) => {
      state.structure_employees = action.payload.structure_employees
    },
    setSend: (state, action) => {
      state.sended = action.payload.sended
    },
    setNewPosition: (state, action) => {
      state.title = action.payload.title
      state.state = action.payload.state
      state.wage = action.payload.wage
    },
    setNewEmp: (state, action) => {
      state.mov_employee_id = action.payload.mov_employee_id
      state.post = action.payload.post
      state.state = action.payload.state
      state.stavka = action.payload.stavka
    },
  },
})

export const {
  setAllMineStructure,
  setStructureInfoById,
  setSend,
  setNewPosition,
  setPositionOfStructureById,
  setNewEmp,
  setEmpOfStructureById,
} = StructureSlice.actions

export default StructureSlice.reducer
