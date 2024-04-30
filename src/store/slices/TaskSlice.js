import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasksId: [],
  subtasksId: [],
  tasks: [],
  employee: [],
  status: '',
  task_name: '',
  subtask_name: '',
  is_critical: false,
  description: '',
  file: [],
  members: [],
  task_tree: [],
  taskchat: [],
  commentm: '',
  deadline_date: null,
  allow_change_deadline: false,
  skip_dayoffs: false,
  check_after_finish: false,
  determ_by_subtasks: false,
  report_after_finish: false,
  subtasks: [
    {
      executor: '',
      deadline_date: '',
      rejection_reason: '',
      subtask_name: '',
    },
  ],
  attached_document: '',
  creator: {},
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setEmployee(state, action) {
      state.employee = action.payload.employee
    },
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks
    },
    setTaskById: (state, action) => {
      state.tasksId = action.payload.tasksId
    },
    setTaskTree: (state, action) => {
      state.task_tree = action.payload.task_tree
    },
    setSubTaskById: (state, action) => {
      state.subtasksId = action.payload.subtasksId
    },
    setTaskChat: (state, action) => {
      state.taskchat = action.payload.taskchat
    },
    setSubTask: (state, action) => {
      state.tasksId = action.payload
    },
    setSubTaskforSubTask: (state, action) => {
      state.subtasksId = action.payload
    },
    setFinalReport: (state, action) => {
      state.tasksId = action.payload
    },
    setFinalReportSubTask: (state, action) => {
      state.subtasksId = action.payload
    },
    setUpdatedStatusTask: (state, action) => {
      state.tasksId = action.payload
    },
    setUpdatedSubStatusTask: (state, action) => {
      state.subtasksId = action.payload
    },

    postTask(state, action) {
      state.name = action.payload.name
      state.is_critical = action.payload.is_critical
      state.description = action.payload.description
      state.members = action.payload.members
      state.deadline_date = action.payload.deadline_date
      state.allow_change_deadline = action.payload.allow_change_deadline
      state.skip_dayoffs = action.payload.skip_dayoffs
      state.check_after_finish = action.payload.check_after_finish
      state.determ_by_subtasks = action.payload.determ_by_subtasks
      state.report_after_finish = action.payload.report_after_finish
      state.subtasks = action.payload.subtasks
      state.attached_document = action.payload.attached_document
    },
    postMessageToTask(state, action) {
      state.commentm = action.payload.commentm
    },
  },
})

export const {
  setEmployee,
  postTask,
  setTasks,
  setTaskById,
  setSubTaskById,
  setTaskStatusById,
  setUpdatedStatusTask,
  setTaskTree,
  setSubTask,
  setFinalReport,
  setTaskChat,
  setUpdatedSubStatusTask,
  setFinalReportSubTask,
  setSubTaskforSubTask,
  postMessageToTask,
} = taskSlice.actions

export default taskSlice.reducer
