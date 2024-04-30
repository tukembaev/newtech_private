import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studyPlan: [],
  studyPlanInfo: [],
}

const StudyPlanSlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setStudyData: (state, action) => {
      state.studyPlan = action.payload.studyPlan
    },
    setStudyInfoData: (state, action) => {
      state.studyPlanInfo = action.payload.studyPlanInfo
    },
  },
})

export const { setStudyData, setStudyInfoData } = StudyPlanSlice.actions

export default StudyPlanSlice.reducer
