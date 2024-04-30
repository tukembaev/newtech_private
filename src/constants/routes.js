import RegisterForm from 'components/Forms/RegisterForm/RegisterForm'

import { Login, MainPage, StatementPage, TasksPage } from 'pages'

import ChatPageContainer from 'pages/ChatPage/ChatPageContainer'

import StatementInfo from 'pages/StatementPage/components/StatementTable/StatementInfo/StatementInfo'
import SupportInfo from 'pages/SupportPage/components/SupportInfo/SupportInfo'
import SupportPage from 'pages/SupportPage/SupportPage'
import TaskItemInfo from 'pages/TasksPage/components/TaskItem/TaskItemInfo/TaskItemInfo'

import TaskTree from 'hooks/TaskTree/TaskTree'

import QuizForm from 'components/Forms/QuizForm/QuizForm'
import StructureForm from 'components/Forms/StructureForm/StructureForm'
import AccademCalendarPage from 'pages/AccademCalendarPage/AccademCalendarPage'
import CalendarPage from 'pages/CalendarPage/CalendarPage'
import AllStatisticPage from 'pages/StatisticPage/AllStatisticPage'
import StatisticPage from 'pages/StatisticPage/StatisticPage'
import StructureInfo from 'pages/StructurePage/components/StructureInfo'
import StructurePage from 'pages/StructurePage/StructurePage'
// import CollectivePage from "pages/СollectivePage/CollectivePage";

import HomeCard from 'pages/HomeCard/HomeCard'

import Europass from 'pages/ProfilePage/Europass/Europass'
import FinalEuropass from 'pages/ProfilePage/Europass/FinalEuropass'
import PersonalCard from 'pages/ProfilePage/PersonalCard/PersonalCard'
import ProjectInfo from 'pages/ProjectPage/ProjectInfo/ProjectInfo'
import StageInfo from 'pages/ProjectPage/ProjectInfo/StageInfo/StageInfo'
import StageAllMembers from 'pages/ProjectPage/ProjectInfo/StageInfo/StageInfoTables/StageAllMembers'
import StageAllRes from 'pages/ProjectPage/ProjectInfo/StageInfo/StageInfoTables/StageAllRes'
import StageAllTasks from 'pages/ProjectPage/ProjectInfo/StageInfo/StageInfoTables/StageAllTasks'
import ProjectPage from 'pages/ProjectPage/ProjectPage'
import PublicationsPage from 'pages/PublicationsPage/PublicationsPage'
import TeamMembersPage from 'pages/TeamPage/TeamMembersPage/TeamMembersPage'
import TeamPage from 'pages/TeamPage/TeamPage'
import TrainingInfo from 'pages/TraningPage/components/TrainingInfo/TrainingInfo'
import TrainingAllMembers from 'pages/TraningPage/components/TrainingInfo/TrainingInfoTables/TrainingAllMembers'
import TrainingPage from 'pages/TraningPage/TrainingPage'

import EuropassEn from 'pages/ProfilePage/Europass/EuropassEn/EuropassEn'
import FinalEuropassEn from 'pages/ProfilePage/Europass/EuropassEn/FinalEuropassEn'
import EuropassKy from 'pages/ProfilePage/Europass/EuropassKy/EuropassKy'
import FinalEuropassKy from 'pages/ProfilePage/Europass/EuropassKy/FinalEuropassKy'
import ProjectExpansesPage from 'pages/ProjectPage/components/ProjectExpansesPage'
import StageExpansesPage from 'pages/ProjectPage/ProjectInfo/StageInfo/components/StageExpansesPage'
import TrainingAllStages from 'pages/TraningPage/components/TrainingInfo/TrainingInfoTables/TrainingAllStages'
import TrainingAllTasks from 'pages/TraningPage/components/TrainingInfo/TrainingInfoTables/TrainingAllTasks'
import WelcomePage from 'pages/WelcomePage/WelcomePage'

const storedData = localStorage.getItem('subscription')
const myTariffInfo = JSON.parse(storedData)

export const routes = [
  { path: '/unet/', component: <Login /> },
  { path: '/', component: <WelcomePage /> },
  { path: '/alerts/:id/', component: <MainPage /> },
  ...(myTariffInfo?.publications
    ? [{ path: '/publications/', component: <PublicationsPage /> }]
    : []),
  ...(myTariffInfo?.task
    ? [{ path: '/tasks/:id/', component: <TasksPage /> }]
    : []),
  ...(myTariffInfo?.task
    ? [{ path: '/task/:id/', component: <TaskItemInfo isSubTask={false} /> }]
    : []),
  ...(myTariffInfo?.task
    ? [{ path: '/subtask/:id/', component: <TaskItemInfo isSubTask={true} /> }]
    : []),
  ...(myTariffInfo?.document
    ? [{ path: '/statements/:id/', component: <StatementPage /> }]
    : []),
  ...(myTariffInfo?.document
    ? [{ path: '/statement/:id/', component: <StatementInfo /> }]
    : []),
  ...(myTariffInfo?.chat
    ? [{ path: '/chats/', component: <ChatPageContainer /> }]
    : []),
  ...(myTariffInfo?.chat
    ? [{ path: '/chats/:id/', component: <ChatPageContainer /> }]
    : []),
  ...(myTariffInfo?.support
    ? [{ path: '/support/', component: <SupportPage /> }]
    : []),
  ...(myTariffInfo?.support
    ? [{ path: '/support/:id/', component: <SupportInfo /> }]
    : []),
  ...(myTariffInfo?.registration_personal
    ? [{ path: '/register_person/', component: <RegisterForm /> }]
    : []),
  ...(myTariffInfo?.statistic
    ? [{ path: '/statistic/', component: <StatisticPage /> }]
    : []),
  ...(myTariffInfo?.statistic
    ? [{ path: '/all-statistic/', component: <AllStatisticPage /> }]
    : []),
  ...(myTariffInfo?.task
    ? [{ path: '/task-tree/:id/', component: <TaskTree /> }]
    : []),
  ...(myTariffInfo?.struction
    ? [{ path: '/structure/', component: <StructurePage /> }]
    : []),
  ...(myTariffInfo?.struction
    ? [{ path: '/structure-sheme/:id/', component: <StructureInfo /> }]
    : []),
  ...(myTariffInfo?.struction
    ? [{ path: '/add-structure/', component: <StructureForm /> }]
    : []),
  { path: '/answer-quiz/', component: <QuizForm /> },
  ...(myTariffInfo?.calendar
    ? [{ path: '/calendar/', component: <CalendarPage /> }]
    : []),
  ...(myTariffInfo?.calendar
    ? [{ path: '/academ-calendar/', component: <AccademCalendarPage /> }]
    : []),
  ...(myTariffInfo?.teams ? [{ path: '/team/', component: <TeamPage /> }] : []),
  ...(myTariffInfo?.teams
    ? [{ path: '/team/:id/', component: <TeamMembersPage /> }]
    : []),
  ...(myTariffInfo?.project
    ? [{ path: '/project/', component: <ProjectPage /> }]
    : []),
  ...(myTariffInfo?.flow
    ? [{ path: '/flow/', component: <TrainingPage /> }]
    : []),
  ...(myTariffInfo?.flow
    ? [{ path: '/flow-info/:id/', component: <TrainingInfo /> }]
    : []),
  ...(myTariffInfo?.flow
    ? [{ path: '/flow-info-members/:id/', component: <TrainingAllMembers /> }]
    : []),
  ...(myTariffInfo?.flow
    ? [{ path: '/flow-info-lessons/:id/', component: <TrainingAllTasks /> }]
    : []),
  ...(myTariffInfo?.flow
    ? [{ path: '/flow-info-all/:id/', component: <TrainingAllStages /> }]
    : []),
  ...(myTariffInfo?.project
    ? [{ path: '/project/:id/', component: <ProjectInfo /> }]
    : []),
  ...(myTariffInfo?.project
    ? [{ path: '/project-expanses/:id/', component: <ProjectExpansesPage /> }]
    : []),
  ...(myTariffInfo?.project
    ? [{ path: '/stage-expanses/:id/', component: <StageExpansesPage /> }]
    : []),
  ...(myTariffInfo?.project
    ? [{ path: '/stage-info/:id/', component: <StageInfo /> }]
    : []),
  ...(myTariffInfo?.project
    ? [{ path: '/stage-info-members/:id/', component: <StageAllMembers /> }]
    : []),
  ...(myTariffInfo?.project
    ? [{ path: '/stage-info-res/:id/', component: <StageAllRes /> }]
    : []),
  ...(myTariffInfo?.project
    ? [{ path: '/stage-info-tasks/:id/', component: <StageAllTasks /> }]
    : []),
  { path: '/personalcard/', component: <PersonalCard /> },
  { path: '/europass/', component: <Europass /> },
  { path: '/finaleuro/', component: <FinalEuropass /> },
  { path: '/europassen/', component: <EuropassEn /> },
  { path: '/finaleuropassen/', component: <FinalEuropassEn /> },
  { path: '/europassky/', component: <EuropassKy /> },
  { path: '/finaleuropassky/', component: <FinalEuropassKy /> },
]
