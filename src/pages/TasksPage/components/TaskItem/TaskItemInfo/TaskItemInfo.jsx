import right from 'assets/icons/chevron_right.png'
import less from 'assets/icons/expand_less.png'
import more from 'assets/icons/expand_more.png'
import tree from 'assets/icons/tree.png'
import { Button, Layout } from 'components'
import SubTaskForm from 'components/Forms/TaskForm/components/SubTaskForm/SubTaskForm'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  addSubTaskDocument,
  addTaskDocument,
  createFinalReport,
  createFinalSubTaskReport,
  getSubTasksData,
  getTasksData,
  updateStatusTask,
  updateSubTasksData,
} from 'service/TaskService'
import {
  setFinalReport,
  setFinalReportSubTask,
  setSubTaskById,
  setTaskById,
  setUpdatedStatusTask,
  setUpdatedSubStatusTask,
} from 'store/slices/TaskSlice'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import styles from './TaskItemInfo.module.scss'

import Popover from '@mui/material/Popover'

import ProfileCard from 'components/ProfileCard/ProfileCard'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import FileBlock from 'utils/FileBlock'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import { getCurrentDate } from 'utils/todayDateForInput'
import ChatTaskItem from './ChatTaskItem/ChatTaskItem'
import TaskDocuments from './components/TaskDocuments'
import TaskResources from './components/TaskResources'
import ProfilePage from 'pages/ProfilePage/ProfilePage'

//Start персоны

//End персон
const TaskItemInfo = React.memo(({ isSubTask }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const [render, setRender] = useState(false)
  const [showMembers, setShowMembers] = useState(true)
  const [showSubtasks, setShowSubtasks] = useState(true)
  const [messageCount, setMessageCount] = useState()
  const [involvePeople, setInvolvePeople] = useState()
  const [isActive, setIsActive] = useState(false)
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [report, setReport] = useState()
  const [report_file, setReport_File] = useState([])
  const [income, setIncome] = useState(null)

  const [modalText, setModalText] = useState('Привет')
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [data, setData] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [changeDeadline, setChangeDeadline] = useState()
  const [localTask, setLocalTask] = useState([])
  const [width, setWidth] = useState(window.innerWidth)
  const user = userInfo()
  const taskinfo = localStorage.getItem('task')
  let text
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    width < 600 && handleSideNavToggle()
  }, [width])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setIsActive(searchParams.has('subtask'))
  }, [location])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.has('subtask')) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [location])

  function handleSideNavToggle() {}

  const getData = useCallback(async () => {
    try {
      let response
      if (isSubTask) {
        response = await getSubTasksData(id, data)
        dispatch(setSubTaskById({ subtasksId: response.data }))
        setInvolvePeople(response.data.members_subtask)
      } else {
        response = await getTasksData(id, data)
        dispatch(setTaskById({ tasksId: response.data }))
        setInvolvePeople(response.data.members)
      }
    } catch (error) {
      console.log(error.response)
    }
  }, [id, data, isSubTask, dispatch])

  useEffect(() => {
    getData()
    setRender(false)
  }, [id, render])

  const onFileChange = (e) => {
    setReport_File(e.target.files[0])
  }

  const handleOpen = () => {
    setOpenModal(true)
  }

  const addDocument = async () => {
    const newStatement = {
      uploaded_files: report_file,
    }

    let response
    if (isSubTask) {
      response = await addSubTaskDocument(id, newStatement)
    } else {
      response = await addTaskDocument(id, newStatement)
    }

    setNotify({
      isOpen: true,
      message: 'Документ успешно добавлен',
      type: 'success',
      sound: 'success',
    })
    setOpenModal2(false)
    setRender(true)
  }

  const FinalRaport = async () => {
    if (report === undefined) {
      setNotify({
        isOpen: true,
        message: 'Введите описание отчета!',
        type: 'error',
        sound: 'error',
      })
      return
    }

    const newStatement = {
      report: report,
      report_file: report_file,
      ...(task.stage === null ? {} : { income: parseFloat(income) }),
      status: 'Завершена',
    }

    let response
    if (isSubTask) {
      response = await createFinalSubTaskReport(id, newStatement)
      dispatch(setFinalReportSubTask(response.data))
    } else {
      response = await createFinalReport(id, newStatement)
      dispatch(setFinalReport(response.data))
    }

    setNotify({
      isOpen: true,
      message: 'Отчет успешно отправлен!',
      type: 'success',
      sound: 'success',
    })
    setOpenModal(false)
  }

  const handleClick = useCallback(() => {
    setIsShown((current) => !current)
  }, [])

  const handleClickChat = useCallback(() => {
    setIsActive((current) => !current)
  }, [])

  const task = useSelector((state) =>
    isSubTask ? state.task.subtasksId : state.task.tasksId,
  )

  const updateStatus = async (text) => {
    let newTask = { status: text }
    let response
    if (isSubTask) {
      response = await updateSubTasksData(id, newTask)
      dispatch(setUpdatedSubStatusTask(response.data))
    } else {
      response = await updateStatusTask(id, newTask)
      dispatch(setUpdatedStatusTask(response.data))
    }

    const successMessage =
      text === 'Начата'
        ? 'Задача начата'
        : text === 'Приостановлена'
          ? 'Задача приостановлена'
          : 'Задача завершена'

    setNotify({
      isOpen: true,
      message: successMessage,
      type: 'success',
      sound: 'success',
    })
  }

  const updateDeadline = async () => {
    let newTask = { deadline_date: changeDeadline }
    let response = await updateStatusTask(id, newTask)
    dispatch(setUpdatedStatusTask(response.data))

    setNotify({
      isOpen: true,
      message: 'Дедлайн успешно изменен',
      type: 'success',
      sound: 'success',
    })

    setIsShown((current) => !current)
  }

  const uncomplited_tasks = isSubTask
    ? task?.sub_subtasks?.filter(
        (item) =>
          item.status?.includes('Ждет') || item.status?.includes('В процессе'),
      )
    : task?.subtasks?.filter(
        (item) =>
          item.status?.includes('Ждет') || item.status?.includes('В процессе'),
      )

  const responsible_peoples = isSubTask
    ? task?.members_subtask
        ?.filter(
          (person) =>
            person.member_type === 'Ответственный' ||
            person.member_type === 'Ментор',
        )
        .map((item) => item.member.user)
    : task?.members
        ?.filter(
          (person) =>
            person.member_type === 'Ответственный' ||
            person.member_type === 'Ментор',
        )
        .map((item) => item.member.user)

  const [stateUserInfo, setStateUserInfo] = useState({
    idUser: '',
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const membersToMap = task?.members_subtask || task?.members

  const subtasksArray = task?.subtasks || task?.sub_subtasks || []
  const open = Boolean(anchorEl)
  const ProfileMemo = useMemo(
    () => <ProfilePage userId={task?.creator?.user} />,
    [task.creator],
  )
  const foundPerson = membersToMap?.find((person) =>
    person.member.surname.includes(user.surName),
  )
  const handleBudget = (e) => {
    let input = e.target.value
    let filteredInput = input.replace(/\D/g, '')
    input = input.slice(0, 4)
    setIncome(filteredInput)
  }
  console.log(task)
  return (
    <Layout>
      <div style={{ width: '99%' }}>
        {width > 600 ? (
          <>
            <SlidingPaneUtil
              size="900px"
              title="Новая подзадача"
              state={state}
              setState={setState}
            >
              {' '}
              <SubTaskForm
                task={task}
                setState={setState}
                isSubTask={isSubTask}
              />{' '}
            </SlidingPaneUtil>
          </>
        ) : (
          <>
            <SlidingPaneUtil
              size="100%"
              title="Новая подзадача"
              state={state}
              setState={setState}
            >
              {' '}
              <SubTaskForm
                task={task}
                setState={setState}
                isSubTask={isSubTask}
              />{' '}
            </SlidingPaneUtil>
          </>
        )}
        <div className={styles.task_info__header}>
          <div className={styles.title}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
              Задачи
            </span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                verticalAlign: 'middle',
              }}
            />

            <span style={{ color: '#090909' }}>
              {isSubTask === true ? task.subtask_name : task.task_name}
            </span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                verticalAlign: 'middle',
              }}
            />
          </div>
        </div>
        <div className={styles.task_info__wrapper}>
          <div className={styles.left_side}>
            {task?.stage === null || task?.resources?.length === 0 ? (
              ''
            ) : (
              <TaskResources
                data={task.resources}
                count={task?.resources?.length}
                isSubtask={task?.log_url}
              />
            )}

            <TaskDocuments
              data={task.files}
              setOpenModal={setOpenModal2}
              status={data.status}
            />
          </div>
          <div className={styles.right_side}>
            <div className={styles.task_info__header2}>
              <div className={styles.head}>
                <h3>
                  Задача создана : {task?.creator?.first_name}{' '}
                  {task?.creator?.surname}
                </h3>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {task.status !== undefined &&
                    ((task.status.includes('Ждет') &&
                      responsible_peoples.includes(user.userId)) ||
                    (task.status.includes('В процессе ') &&
                      responsible_peoples.includes(user.userId)) ? (
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <Button
                          className={styles.btn2}
                          onClick={() => {
                            const status = task.status.includes('Ждет')
                              ? 'Начата'
                              : 'Приостановлена'
                            updateStatus(status)
                          }}
                        >
                            {task.status.includes('Ждет')
                            ? 'Начать'
                            : 'Приостановить'}
                          </Button>
                          {uncomplited_tasks?.length === 0 && (
                          <Button
                            className={styles.btn2}
                            onClick={() => setOpenModal(true)}
                          >
                            Завершить
                          </Button>
                        )}
                        </div>
                    ) : (
                      ''
                    ))}

                  {task?.status === 'Завершена'
                    ? ''
                    : task?.creator?.user === user.userId && (
                    <Button
                          className={styles.btn1}
                          onClick={() => setOpenModal(true)}
                        >
                      Досрочно завершить
                    </Button>
                      )}
                </div>
              </div>
              <div className={styles.middle}>
                <h2 style={{ fontSize: '36px', fontWeight: '800' }}>
                  {isSubTask === true ? task.subtask_name : task.task_name}
                </h2>
                {isSubTask === true ? (
                  <img
                    onClick={() => {
                      navigate(`/task-tree/${task.id}`, {
                        state: { isSubtasks: isSubTask },
                      })
                    }}
                    className={styles.size}
                    title="Дерево задачи"
                    src={tree}
                    alt=""
                  />
                ) : (
                  <img
                    onClick={() => {
                      navigate(`/task-tree/${task.id}`, {
                        state: { isSubtasks: isSubTask },
                      })
                    }}
                    className={styles.size}
                    title="Дерево подзадачи"
                    src={tree}
                    alt=""
                  />
                )}
              </div>
              <div className={styles.bottom}>
                <h3>{task.status}</h3>
              </div>
              {task.attached_document === '' ||
              task.attached_document === undefined ||
              task.attached_document === null ? (
                ''
              ) : (
                <Button
                  className={styles.default_button}
                  href={`/${task.attached_document}`}
                >{`Прикрепленный документ`}</Button>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  padding: '15px 0',
                }}
              >
                <h3 style={{ color: '#5C5F61' }}>Описание задачи</h3>
                {task?.description?.split('\n').map((line, index) => (
                  <h4 key={index}>{line}</h4>
                ))}
              </div>
              {task.report !== null || task.report_file !== null ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}
                >
                  <h3 style={{ color: '#5C5F61' }}>Отчет:</h3>
                  {task.report !== null ? <h4>{task.report}</h4> : null}
                  {task.report_file !== null ? (
                    <FileBlock file_url={task?.report_file} />
                  ) : null}
                </div>
              ) : null}
              <div
                className={styles.bottom}
                style={{
                  display: 'flex',
                  gap: '65px',
                  paddingTop: '15px',
                  justifyContent: 'right',
                }}
              >
                {task.accounting === null ||
                task.accounting === undefined ? null : (
                  <h3>Бюджет: {task?.accounting?.initial_budget}</h3>
                )}
                <div style={{ display: 'flex' }}>
                  <h3>
                    Крайний срок:{' '}
                    {task.deadline_date === null
                      ? 'Бессрочная'
                      : task.deadline_date}
                  </h3>
                  {foundPerson?.member_type === 'Ответственный' &&
                  task.allow_change_deadline === true &&
                  task.status !== 'Завершена' ? (
                    <div style={{ paddingLeft: '15px' }}>
                      <h3
                        className={styles.edit_deadline_span}
                        onClick={handleClick}
                      >
                        Изменить крайний срок
                      </h3>

                      {isShown && (
                        <div>
                          <input
                            type="date"
                            onChange={(e) => setChangeDeadline(e.target.value)}
                            className={styles.edit_deadline}
                            min={getCurrentDate()}
                          />
                          <Button
                            className={styles.btn2}
                            onClick={() => {
                              updateDeadline(task)
                            }}
                          >
                            {' '}
                            Изменить{' '}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                <h3>Поставлена: {task.create_date}</h3>
              </div>
            </div>
            {isActive ? (
              <div className={styles.stage_bottom}>
                <div className={styles.task_info__header3}>
                  <div className={styles.title3}>
                    <h5>Чат задачи</h5>
                  </div>

                  <div className={styles.title3}>
                    <Button
                      className={styles.default_button}
                      onClick={handleClickChat}
                    >
                      {' '}
                      Подзадачи{' '}
                    </Button>
                  </div>
                </div>
                <ChatTaskItem
                  setMessageCount={setMessageCount}
                  globalChat={false}
                  SupportChat={false}
                  SupportComplete={undefined}
                />
              </div>
            ) : (
              <div className={styles.stage_bottom}>
                <div className={styles.employee_income_section}>
                  <div className={styles.members_section}>
                    <div className={styles.task_info__header3}>
                      <div className={styles.title3}>
                        <h5>Участники ({membersToMap?.length})</h5>
                        {showMembers ? (
                          <img
                            src={less}
                            alt=""
                            className={styles.size}
                            onClick={() => setShowMembers(!showMembers)}
                            style={{
                              verticalAlign: 'middle',
                            }}
                          />
                        ) : (
                          <img
                            src={more}
                            alt=""
                            className={styles.size}
                            onClick={() => setShowMembers(!showMembers)}
                            style={{
                              verticalAlign: 'middle',
                            }}
                          />
                        )}
                      </div>
                      <div className={styles.title3}>
                        {task.log_url ? null : (
                          <Button
                            className={styles.default_button}
                            onClick={handleClickChat}
                          >
                            {' '}
                            Чат задачи{' '}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className={styles.task_info__body}>
                      {showMembers && (
                        <table className={styles.table__wrapper}>
                          <thead className={styles.table__head}>
                            <tr
                              className={styles.table__row}
                              style={{ backgroundColor: '#F6F8F9' }}
                            >
                              <th className={styles.table__item}>
                                <span className={styles.table__title}>
                                  Сотрудник
                                </span>
                              </th>
                              <th className={styles.table__item}>
                                <span className={styles.table__title}>
                                  Статус{' '}
                                </span>
                              </th>
                              <th className={styles.table__item}>
                                <span className={styles.table__title}>
                                  Роль
                                </span>
                              </th>

                              <th className={styles.table__item}>
                                <span className={styles.table__title}>
                                  Электронный адрес
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className={styles.table__body}>
                            {membersToMap?.map((item) => (
                              <>
                                <PopupState
                                  variant="popover"
                                  popupId="demo-popup-popover"
                                >
                                  {(popupState) => (
                                    <>
                                      <tr
                                        className={styles.table__row}
                                        style={{ backgroundColor: '#F6F8F9' }}
                                        key={item.member.id}
                                        {...bindTrigger(popupState)}
                                      >
                                        <td className={styles.table__item3}>
                                          <img
                                            src={item.member.imeag}
                                            alt=""
                                            style={{
                                              width: '40px',
                                              height: '40px',
                                              borderRadius: '50%',
                                              verticalAlign: 'middle',
                                              marginRight: '15px',
                                              objectFit: 'cover',
                                            }}
                                          />
                                          <span
                                            className={styles.table__title3}
                                            style={{ fontWeight: '800' }}
                                          >
                                            {item.member.first_name}
                                          </span>
                                        </td>
                                        <td className={styles.table__item3}>
                                          {item.member.is_online ? (
                                            <span
                                              className={styles.table__title3}
                                              style={{
                                                padding: '2px 14px 2px 14px',
                                                background:
                                                  'rgb(72 206 143 / 73%)',
                                                color: '#158318',
                                                borderRadius: '16px',
                                                fontSize: '14px',
                                              }}
                                            >
                                              Online
                                            </span>
                                          ) : (
                                            <span
                                              className={styles.table__title3}
                                              style={{
                                                padding: '2px 14px 2px 14px',
                                                background: '#ddd',
                                                color: 'black',
                                                borderRadius: '16px',
                                                fontSize: '14px',
                                              }}
                                            >
                                              Offline
                                            </span>
                                          )}
                                        </td>
                                        <td className={styles.table__item3}>
                                          <span
                                            className={styles.table__title3}
                                          >
                                            {item.member_type}
                                          </span>
                                        </td>
                                        <td className={styles.table__item3}>
                                          <span
                                            className={styles.table__title3}
                                          >
                                            {' '}
                                            {item.member.email}{' '}
                                          </span>
                                        </td>
                                      </tr>
                                      <Popover
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                          vertical: 'top',
                                          horizontal: 'left',
                                        }}
                                      >
                                        <ProfileCard
                                          userId={item.member.user}
                                        />
                                      </Popover>
                                    </>
                                  )}
                                </PopupState>
                              </>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.task_section}>
                  <div className={styles.task_info__header3}>
                    <div className={styles.title3}>
                      <h5>Подзадачи</h5>
                    </div>
                    {task.status !== 'Завершена' &&
                    (responsible_peoples?.includes(user.userId) ||
                      task?.creator?.user === user.userId) ? (
                        <Button
                        className={styles.default_button}
                        onClick={() => setState({ isPaneOpen: true })}
                      >
                          Добавить подзадачу
                        </Button>
                    ) : null}
                  </div>
                  <div className={styles.task_info__body}>
                    <table className={styles.table__wrapper}>
                      <thead className={styles.table__head}>
                        <tr className={styles.table__row}>
                          <th className={styles.table__item}>
                            <span className={styles.table__title}>
                              Заголовок
                            </span>
                          </th>
                          <th className={styles.table__item}>
                            <span className={styles.table__title}>Статус</span>
                          </th>
                          <th className={styles.table__item}>
                            <span className={styles.table__title}>
                              Ответственный
                            </span>
                          </th>
                          <th className={styles.table__item}>
                            <span className={styles.table__title}>
                              Поставлена
                            </span>
                          </th>
                          <th className={styles.table__item}>
                            <span className={styles.table__title}>
                              Крайний срок
                            </span>
                          </th>
                        </tr>
                      </thead>

                      <tbody className={styles.table__body}>
                        {subtasksArray?.map((item) => (
                          <tr
                            className={styles.table__row}
                            onClick={() => navigate(`/subtask/${item.id}`)}
                          >
                            <td className={styles.table__item}>
                              <span
                                className={styles.table__title}
                                style={{ fontWeight: '700' }}
                              >
                                {item?.subtask_name}
                              </span>
                            </td>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {' '}
                                {item?.status}
                              </span>
                            </td>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {' '}
                                {
                                  item?.members_subtask?.[0]?.member?.first_name
                                }{' '}
                                {item?.members_subtask?.[0]?.member?.surname}
                              </span>
                            </td>

                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {' '}
                                {item?.create_date}
                              </span>
                            </td>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {' '}
                                {item?.deadline_date === null
                                  ? 'Бессрочная'
                                  : item?.deadline_date}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ModalWindow
        openModal={openModal2}
        setOpenModal={setOpenModal2}
        modalTitle={'Добавление файла'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15' }}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <input
                  type="file"
                  name="file_upload"
                  onChange={onFileChange}
                  style={{ marginTop: '15px' }}
                  // accept="image/& , .pdf"
                />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => setOpenModal2(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button onClick={addDocument} className={styles.btn_pin}>
              Добавить
            </Button>
          </div>
        </div>
      </ModalWindow>
      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={'Для этой задачи обязателен отчет'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15' }}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <textarea
                  onChange={(e) => setReport(e.target.value)}
                  className={styles.discription_input}
                  placeholder="Описание отчета"
                  maxLength={2000}
                  required
                />
                {task.is_corporate ? (
                  <textarea
                    className={styles.discription_input}
                    placeholder="Прибыль за задачу"
                    value={income}
                    onChange={handleBudget}
                    maxLength={18}
                    max={18}
                    style={{ height: '35px' }}
                    required
                  />
                ) : null}

                <input
                  type="file"
                  name="file_upload"
                  onChange={onFileChange}
                  style={{ marginTop: '15px' }}
                  // accept="image/& , .pdf"
                />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button onClick={FinalRaport} className={styles.btn_pin}>
              Сохранить
            </Button>
          </div>
        </div>
      </ModalWindow>
    </Layout>
  )
})
export default TaskItemInfo
