import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
  projectInfo: [],
  stageInfo: [],
  stageTask: [],
  flows: [],
  members: [],
}

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload.projects
    },
    setProjectInfo: (state, action) => {
      state.projectInfo = action.payload.projectInfo
    },
    setStageInfo: (state, action) => {
      state.stageInfo = action.payload.stageInfo
    },
    setStageTask: (state, action) => {
      state.stageTask = action.payload.stageTask
    },
    setTrainingFlows: (state, action) => {
      state.flows = action.payload.flows
    },
    setMembersOfTraining: (state, action) => {
      state.members = action.payload.members
    },
  },
})

export const {
  setProjects,
  setProjectInfo,
  setStageInfo,
  setStageTask,
  setTrainingFlows,
  setMembersOfTraining,
} = ProjectSlice.actions

export default ProjectSlice.reducer
