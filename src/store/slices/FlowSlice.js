import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allFlows: [],
  flowShedules: [],
}

const FlowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setFlows: (state, action) => {
      state.allFlows = action.payload.allFlows
    },

    setFlowsShedules: (state, action) => {
      state.flowShedules = action.payload.flowShedules
    },
  },
})

export const { setFlows, setFlowsShedules } = FlowSlice.actions

export default FlowSlice.reducer
