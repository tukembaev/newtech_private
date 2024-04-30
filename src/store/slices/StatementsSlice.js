import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statements: [],
  statementId: [],
  requirments: [],
  chancellery: [],
  allraports: [],
  signed_statements: [],
  allapproval: [],
  type: '',
  podtypezayavki: '',
  text: '',
  file: '',
  date_today: '',
  requestedmen: '',
  uniq_codes: '',
  status: '',
  prich_pr_orkaz: '',
}

const statementSlice = createSlice({
  name: 'statement',
  initialState,
  reducers: {
    setStatements: (state, action) => {
      state.statements = action.payload.statements
    },
    setSignedStatements: (state, action) => {
      state.signed_statements = action.payload.signed_statements
    },
    setStatementById: (state, action) => {
      state.statementId = action.payload.statementId
    },
    setAllRequirments: (state, action) => {
      state.requirments = action.payload.requirments
    },
    setChancellerys: (state, action) => {
      state.chancellery = action.payload.chancellery
    },
    setAllRaports: (state, action) => {
      state.allraports = action.payload.allraports
    },
    setSignStatement: (state, action) => {
      state.statementId = action.payload
    },
    setAllApproval: (state, action) => {
      state.allapproval = action.payload.allapproval
    },

    setSignSendReqToZavhoz: (state, action) => {
      state.company_organization = action.payload.company_organization
      state.type = action.payload.type
      state.views_operations = action.payload.views_operations
      state.warehouse = action.payload.warehouse
      state.department = action.payload.department
      state.requestedmen = action.payload.requestedmen
      state.uniq_codes = action.payload.uniq_codes
      state.purchaselist.purchaselistproducts = action.payload
    },
    postStatement(state, action) {
      state.addressee = action.payload.addressee
      state.type = action.payload.type
      state.text = action.payload.text
      state.file = action.payload.file
    },
    postRepair(state, action) {
      state.employee = action.payload.employee
      state.type = action.payload.type
      state.direction = action.payload.direction
      state.text = action.payload.text
      state.file = action.payload.file
    },
    postOrgTech(state, action) {
      state.employee = action.payload.employee
      state.type = action.payload.type
      state.podtypezayavki = action.payload.podtypezayavki
      state.text = action.payload.text
      state.file = action.payload.file
    },
    postRequirment(state, action) {
      state.company_organization = action.payload.company_organization
      state.type = action.payload.type
      state.views_operations = action.payload.views_operations
      state.warehouse = action.payload.warehouse
      state.date_today = action.payload.date_today
      state.department = action.payload.department
      state.requestedmen = action.payload.requestedmen
      state.uniq_codes = action.payload.uniq_codes
      state.purchaselistproducts = action.payload.purchaselistproducts
    },
    postWriteOff(state, action) {
      state.employee = action.payload.employee
      state.type = action.payload.type
      state.podtypezayavki = action.payload.podtypezayavki
      state.text = action.payload.text
      state.spisanie = action.payload.spisanie
    },
  },
})

export const {
  postRepair,
  postStatement,
  setStatements,
  setChancellerys,
  setAllRaports,
  setSignedStatements,
  postOrgTech,
  postWriteOff,
  setStatementById,
  postRequirment,
  setSignStatement,
  setAllRequirments,
  setAllApproval,
  setSignSendReqToZavhoz,
} = statementSlice.actions

export default statementSlice.reducer
