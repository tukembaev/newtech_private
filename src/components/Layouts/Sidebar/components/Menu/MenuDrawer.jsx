import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import { styled, useTheme } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import userInfo from 'utils/userInfo'
import registration from 'assets/side_panel_icons/10registration.png'
import faq from 'assets/side_panel_icons/11faq.png'
import home from 'assets/side_panel_icons/1home.png'
import task from 'assets/side_panel_icons/2task.png'
import personal_calendar from 'assets/side_panel_icons/3calendar.png'
import teams from 'assets/side_panel_icons/4team.png'
import docs from 'assets/side_panel_icons/5docs.png'
import stream from 'assets/side_panel_icons/5stream.png'
import chart from 'assets/side_panel_icons/7chart.png'
import calendar365 from 'assets/side_panel_icons/8calendar.png'
import chat from 'assets/side_panel_icons/9chat.png'
import project from 'assets/side_panel_icons/project.png'
import publication from 'assets/side_panel_icons/publication.png'
import struc from 'assets/side_panel_icons/struc.png'
import styles from './Menu.module.scss'
const drawerWidth = 270

const openedMixin = (theme) => ({
  width: drawerWidth,
  borderRight: 'unset',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  '& img': {
    width: '26px',
    height: '26px',
    marginBottom: '3px',
  },

  '& p': {
    paddingLeft: '10px',
  },
})

const closedMixin = (theme) => ({
  transition: theme?.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  borderRight: 'unset',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  textAligh: 'center',
  '& img': {
    // Задаем стили для всех img элементов внутри контейнера, к которому применяется этот mixin
    width: '26px', // Замените на нужные стили
    height: '26px', // Замените на нужные стилие
    // Замените на нужные стили
    marginBottom: '3px',
  },
  '& p': {
    paddingLeft: '10px',
    marginBottom: '5px',
  },
})

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  borderRight: 'unset',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      background: 'rgb(35, 32, 32, 0.95)', // Background color with 32% opacity
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      background: 'rgb(35, 32, 32, 0.95)', // Background color with 32% opacity
    },
  }),
}))

export default function MenuDrawer() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = userInfo()

  const storedData = localStorage.getItem('subscription') // Получить строку из localStorage
  const myTariffInfo = JSON.parse(storedData) // Преобразовать строку в объект

  const location = useLocation()
  const handleMouseEnter = () => {
    setOpen(true)
  }

  const handleMouseLeave = () => {
    setOpen(false)
  }
  return (
    <div>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <StyledDrawerHeader>
          {/* {open ?     <div className={styles.logo__wrapper}>
          <img src={unetLogo} alt="" />
        </div> :  null} */}
          {open ? (
            <div className={styles.logo__wrapper}>
              <p style={{ color: 'white' }}>Навигация</p>
            </div>
          ) : null}

          <IconButton
            sx={{ color: 'white', paddingRight: '8px' }}
            aria-label="open drawer"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            edge="start"
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </StyledDrawerHeader>
        <Divider />
        <div className={styles.menu__list}>
          <List>
            <>
              <ListItemButton
                disablePadding
                onClick={() => navigate(`/alerts/${user.userId}`)}
                style={
                  location.pathname.includes('alerts')
                    ? { background: 'rgb(188 182 182 / 34%)' }
                    : {}
                }
              >
                <img src={home} alt="" />
                {open ? <p>Главная</p> : null}
              </ListItemButton>
              {myTariffInfo?.publications ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/publications/`)}
                  style={
                    location.pathname.includes('publications')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={publication} alt="" />
                  {open ? <p>Публикации</p> : null}
                </ListItemButton>
              ) : null}
              {myTariffInfo?.project ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/project/`)}
                  style={
                    location.pathname.includes('project') ||
                    location.pathname.includes('stage')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={project} alt="" />

                  {open ? <p>Проект</p> : null}
                </ListItemButton>
              ) : null}
              {myTariffInfo?.flow ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/flow/`)}
                  style={
                    location.pathname.includes('flow') ||
                    location.pathname.includes('/flow-info')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={stream} alt="" />

                  {open ? <p>Обучение</p> : null}
                </ListItemButton>
              ) : null}
              {myTariffInfo?.task ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/tasks/${user.userId}`)}
                  style={
                    location.pathname.includes('task')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={task} alt="" />

                  {open ? <p>Задачи</p> : null}
                </ListItemButton>
              ) : null}
              {myTariffInfo?.calendar ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/calendar/`)}
                  style={
                    location.pathname.includes('/calendar/')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={personal_calendar} alt="" />

                  {open ? <p>Календарь</p> : null}
                </ListItemButton>
              ) : null}
              {myTariffInfo?.document ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/statements/${user.userId}`)}
                  style={
                    location.pathname.includes('statement')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={docs} alt="" />

                  {open ? <p>Документооборот</p> : null}
                </ListItemButton>
              ) : null}
              {myTariffInfo?.chat ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/chats/`)}
                  style={
                    location.pathname.includes('chat')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={chat} alt="" />

                  {open ? <p>Мессенджер</p> : null}
                </ListItemButton>
              ) : null}

              {myTariffInfo?.calendar ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/academ-calendar/`)}
                  style={
                    location.pathname === '/academ-calendar/'
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={calendar365} alt="" />

                  {open ? <p>Планирование</p> : null}
                </ListItemButton>
              ) : null}
              {myTariffInfo?.statistic ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/statistic/`)}
                  style={
                    location.pathname.includes('statistic')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={chart} alt="" />

                  {open ? <p>Статистика</p> : null}
                </ListItemButton>
              ) : null}

              {myTariffInfo?.struction ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/structure`)}
                  style={
                    location.pathname.includes('structure')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={struc} alt="" />

                  {open ? <p>Компания</p> : null}
                </ListItemButton>
              ) : null}

              {myTariffInfo?.teams ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/team`)}
                  style={
                    location.pathname.includes('team')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={teams} alt="" />

                  {open ? <p>Команды</p> : null}
                </ListItemButton>
              ) : null}

              {user.is_admin_of && myTariffInfo?.registration_personal ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/register_person`)}
                  style={
                    location.pathname.includes('register_person')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={registration} alt="" />

                  {open ? <p>Регистрация</p> : null}
                </ListItemButton>
              ) : null}
              {myTariffInfo?.support ? (
                <ListItemButton
                  disablePadding
                  onClick={() => navigate(`/support`)}
                  style={
                    location.pathname.includes('support')
                      ? { background: 'rgb(188 182 182 / 34%)' }
                      : {}
                  }
                >
                  <img src={faq} alt="" />
                  {open ? <p>Поддержка 24/7</p> : null}
                </ListItemButton>
              ) : null}
            </>
          </List>
        </div>
      </Drawer>
    </div>
  )
}
