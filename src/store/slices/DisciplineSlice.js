import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  my_discipline: [],
  discipline_data: [],
  all_directions: [],
  all_groups: [],
}

const DisciplineSlice = createSlice({
  name: 'discipline',
  initialState,

  setMyDiscipline: (state, action) => {
    state.my_discipline = action.payload.my_discipline
  },
  setDisciplineInfo: (state, action) => {
    state.discipline_data = action.payload.discipline_data
  },
  setDirections: (state, action) => {
    state.all_directions = action.payload.all_directions
  },

  setGroups: (state, action) => {
    state.all_groups = action.payload.all_groups
  },
})

export const { setMyDiscipline, setDisciplineInfo } = DisciplineSlice.actions

export default DisciplineSlice.reducer
