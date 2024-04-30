import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  team: [],
}

const CollectiveSlice = createSlice({
  name: 'collective',
  initialState,
  reducers: {
    setMyMembers: (state, action) => {
      state.members = action.payload.members
    },
    setMyTeam: (state, action) => {
      state.team = action.payload.team
    },
    setTeamMembers: (state, action) => {
      state.team_members = action.payload.team_members
    },
  },
})

export const { setMyTeam, setTeamMembers, setMyMembers } =
  CollectiveSlice.actions

export default CollectiveSlice.reducer
