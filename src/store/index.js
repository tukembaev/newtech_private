import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlice'
import StatementsSlice from './slices/StatementsSlice'
import TaskSlice from './slices/TaskSlice'
import AlertSlice from './slices/AlertSlice'
import QrSlice from './slices/QrSlice'
import OrderSlice from './slices/OrderSlice'
import ActSlice from './slices/ActSlice'
import ChatSlice from './slices/ChatSlice'
import SupportSlice from './slices/SupportSlice'
import ZayavlenieSlice from './slices/ZayavlenieSlice'
import AdminSlice from './slices/AdminSlice'
import DocumentSlice from './slices/DocumentSlice'
import StatisticSlice from './slices/StatisticSlice'
import StructureSlice from './slices/StructureSlice'
import CalendarSlice from './slices/CalendarSlice'
import CollectiveSlice from './slices/CollectiveSlice'
import StudyPlanSlice from './slices/StudyPlanSlice'
import FlowSlice from './slices/FlowSlice'
import DisciplineSlice from './slices/DisciplineSlice'
import ProjectSlice from './slices/ProjectSlice'
import PersonalCard from './slices/PersonalCard'
import PublicationSlice from './slices/PublicationSlice'
import TariffSlice from './slices/TariffSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    statement: StatementsSlice,
    documents: DocumentSlice,
    task: TaskSlice,
    qr: QrSlice,
    alert: AlertSlice,
    order: OrderSlice,
    act: ActSlice,
    chat: ChatSlice,
    support: SupportSlice,
    zayavleniya: ZayavlenieSlice,
    admin: AdminSlice,
    statistic: StatisticSlice,
    structure: StructureSlice,
    calendar: CalendarSlice,
    collective: CollectiveSlice,
    study: StudyPlanSlice,
    flow: FlowSlice,
    discipline: DisciplineSlice,
    project: ProjectSlice,
    personalcard: PersonalCard,
    publications: PublicationSlice,
    tariff: TariffSlice,
  },
})
