import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allPublications: [],
}

const PublicationSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    setPublications: (state, action) => {
      state.allPublications = action.payload.allPublications
    },
  },
})

export const { setPublications } = PublicationSlice.actions

export default PublicationSlice.reducer
