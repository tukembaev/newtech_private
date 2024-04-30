import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employee_documents: [],
  documentsId: [],
  chancelleryDocuments: [],
  mine_documents: [],
  commentm: '',
}

const DocumentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocumentsDataById: (state, action) => {
      state.documentsId = action.payload.zayavlenieId
    },

    setEmployeeDocuments: (state, action) => {
      state.employee_documents = action.payload.employee_documents
    },
    setForMeDocuments: (state, action) => {
      state.mine_documents = action.payload.mine_documents
    },

    setDocumentPatch: (state, action) => {
      state.documentsId = action.payload
    },
    createDocument(state, action) {
      state.addressee = action.payload.addressee
      state.type = action.payload.type
      state.text = action.payload.text
      state.file = action.payload.file
    },
  },
})

export const {
  setDocumentsDataById,
  setEmployeeDocuments,
  setForMeDocuments,
  setChancellerysDocument,
  setDocumentPatch,
  createDocument,
} = DocumentSlice.actions

export default DocumentSlice.reducer
