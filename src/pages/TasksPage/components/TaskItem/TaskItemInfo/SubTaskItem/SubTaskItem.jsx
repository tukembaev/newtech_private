import Popover from '@mui/material/Popover'
import PopupState from 'material-ui-popup-state'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, } from 'react-router-dom'
import { createSubTask } from 'service/TaskService'
import { setUpdatedStatusTask } from 'store/slices/TaskSlice'
import Notification from 'utils/Notifications'
import todayDate from 'utils/todayDate'
import userInfo from 'utils/userInfo'
import ProfilePage from 'pages/ProfilePage/ProfilePage'
import styles from './SubTaskItem.module.scss'

const SubTaskItem = ({ task, setStateUserInfo }) => {
  const [id, setId] = useState()
  const [otkaz, setOtkaz] = useState(null)
  const navigate = useNavigate()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })

  let text

  const dispatch = useDispatch()
  const user = userInfo()
  const today = todayDate()

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])
  useEffect(() => {
    width < 600 && handleSideNavToggle()
  })
  function handleSideNavToggle() {}

  const handleClick = (id) => {
    setState({ isPaneOpen: true })
    setId(id)
  }
  const handleItemClick = async (id, task, text) => {
    const updatedSubTask = [{ id: parseInt(id), status: text }]
    const updatedSubTask2 = { subtasks: updatedSubTask }

    let response = await createSubTask(task.id, updatedSubTask2)
    dispatch(setUpdatedStatusTask(response.data))

    text === 'Завершена'
      ? setNotify({
          isOpen: true,
          message: 'Подзадача завершена',
          type: 'success',
          sound: 'success',
        })
      : text === 'В процессе выполнения'
        ? setNotify({
            isOpen: true,
            message: 'Подзадача начата',
            type: 'success',
            sound: 'success',
          })
        : setNotify({
            isOpen: true,
            message: 'Подзадача приостановлена ',
            type: 'success',
            sound: 'success',
          })
  }

  const DeclineSubTask = async (task, text) => {
    if (otkaz === null) {
      setNotify({
        isOpen: true,
        message: 'Введите причину отказа ',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      const updatedSubTask = [
        { id: parseInt(id), status: text, rejection_reason: otkaz },
      ]
      const updatedSubTask2 = { subtasks: updatedSubTask }
      let response = await createSubTask(task.id, updatedSubTask2)
      setOtkaz(null)
      dispatch(setUpdatedStatusTask(response.data))
      setNotify({
        isOpen: true,
        message: 'Подзадача отклонена',
        type: 'success',
        sound: 'success',
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }
  //Start персоны
  const [data, setData] = useState([])

  const [statePerson, setStatePerson] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })
  const [presonId, setPresonId] = useState('')
  const updateSubtask = async (index) => {
    let newTask = { ...task, subtasks: text }

    let response = await createSubTask(id, newTask)

    dispatch(setUpdatedStatusTask(response.data))
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const ProfileMemo = useMemo(
    () => <ProfilePage userId={task?.members_subtask[0]?.member.user} />,
    [task?.members_subtask],
  )
  return (
    <>
      {/* <h1 className={styles.subtask_title}>Подзадачи</h1> */}
      {/* {task.subtasks === undefined
        ? []
        : task.subtasks.map((item) => {
          return ( */}
      <div>
        <div className={styles.task__wrapper}>
          <div className={styles.task__line}></div>

          <div className={styles.task_header}>
            <p className={styles.task__link}>
              {task.subtask_name}{' '}
              <span onClick={() => navigate(`/subtask/${task.id}`)} href="">
                Открыть
              </span>
            </p>
            {/* <p className={styles.task__link2}>{item.description}</p> */}
          </div>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <>
                <div
                  className={styles.footer}
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  Ответственный:
                  <span className={styles.cursor_pointer}>
                    {task?.members_subtask[0].member.first_name}{' '}
                    {task?.members_subtask[0].member.surname}{' '}
                  </span>
                </div>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose}
                >
                  {ProfileMemo}
                </Popover>
              </>
            )}
          </PopupState>

          <div>
            <p className={styles.task__term3}>
              {task.status}{' '}
              {task.status === 'Завершена' ? (
                <span> {task.edit_status_date}</span>
              ) : (
                ''
              )}{' '}
            </p>
            {task.rejection_reason === null ? (
              ''
            ) : (
              <p className={styles.task__link2}>
                Причина отказа: {task.rejection_reason}
              </p>
            )}
          </div>

          <div className={styles.dates}>
            <div>
              <p
                className={styles.task__term1}
              >{`Поставлена ${task.create_date}`}</p>
            </div>
            <div>
              {task.deadline_date === null ? (
                <p className={styles.task__term2}>Дэдлайн: Бессрочная </p>
              ) : (
                <p className={styles.task__term2}>
                  {' '}
                  {`Дэдлайн ${task.deadline_date}`}{' '}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* );
        })} */}
      <Notification notify={notify} setNotify={setNotify} />
    </>
  )
}

export default SubTaskItem
