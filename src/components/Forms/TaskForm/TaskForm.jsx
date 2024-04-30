import { Button } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { getMyMembers } from 'service/CollectiveService'
import { createTask } from 'service/TaskService'
import { setMyMembers } from 'store/slices/CollectiveSlice'
import { postTask } from 'store/slices/TaskSlice'
import Notification from 'utils/Notifications'
import styles from './TaskForm.module.scss'
import TaskCoWorker from './components/TaskCoWorker/TaskCoWorker'
import TaskDeadline from './components/TaskDeadline/TaskDeadline'
import TaskResponsible from './components/TaskResponsible/TaskResponsible'
import TaskWatchers from './components/TaskWatchers/TaskWatchers'
function TaskForm({ idstatement, typestatement, setRender, setState }) {
  const [loader, setLoader] = useState(false)
  const [id, setId] = useState()
  const [CoWorker, setCoWorker] = useState([])
  const [Watchers, setWatchers] = useState([])
  const [Responsible, setResponsible] = useState([])
  const [Director, setDirector] = useState([])
  const [deadline_date, setDeadlineDate] = useState(null)
  const [task_name, setTaskName] = useState('')
  const [file, setFile] = useState('')
  const [description, setDescription] = useState('')
  const [subtasks] = useState([])
  const [attached_document] = useState('')
  //Checkboxes
  const [is_critical, setIsCriticalChecked] = useState(false)
  const [allow_change_deadline, setIsAllowChange] = useState(false)
  const [skip_dayoffs, setisSkipDayOff] = useState(false)
  const [check_after_finish, setIsCheckFinish] = useState(false)
  const [determ_by_subtasks, setIsDeterm] = useState(false)
  const [report_after_finish, setIsReportFinish] = useState(false)
  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  //Dispatch
  const dispatch = useDispatch()

  //Function

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const getData = async () => {
    try {
      let response = await getMyMembers('task',data)

      dispatch(
        setMyMembers({
          members: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
    setRender(true)
  }, [])

  const myTeam = useSelector((state) => state.collective.members)
  const confirmedEmployees = myTeam ? [myTeam.confirmed] : []
  const data = [confirmedEmployees.flat().filter((item) => item.flag)]
  // const data = [[myTeam?.confirmed].flat().filter((item) => item.flag)]
  // const allResponsible = {
  //   member_id: Responsible.id ,
  //   member_type: "Ответственный",
  // };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (task_name === '') {
      setNotify({
        isOpen: true,
        message: 'Введите название задачи',
        type: 'warning',
        sound: 'warning',
      })
    } else if (allResponsible.length === 0) {
      setNotify({
        isOpen: true,
        message: 'Выберите ответственного',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      event.preventDefault()

      let clipedStatement = ''
      if (idstatement === undefined) {
        clipedStatement = ''
      } else {
        clipedStatement = idstatement
      }
      setDeadlineDate(null)

      try {
        setLoader(true)
        let response = await createTask({
          task_name,
          is_critical,
          description,
          members: selectedPeople,
          deadline_date,
          allow_change_deadline,
          skip_dayoffs,
          check_after_finish,
          determ_by_subtasks,
          report_after_finish,
          subtasks,
          attached_document: String(clipedStatement),
        })
        dispatch(
          postTask({
            task_name: task_name,
            is_critical,
            description: description,
            members: selectedPeople,
            deadline_date,
            allow_change_deadline,
            skip_dayoffs,
            check_after_finish,
            determ_by_subtasks,
            report_after_finish,
            subtasks,
            attached_document: clipedStatement,
          }),
        )

        setNotify({
          isOpen: true,
          message: 'Задача успешно отправлена',
          type: 'success',
          sound: 'success',
        })

        setState({ isPaneOpen: false })
        setRender(true)
      } catch (error) {
        setNotify({
          isOpen: true,
          message: 'Ошибка',
          type: 'error',
          sound: 'error',
        })
        console.log(error.data)
      } finally {
        setLoader(false)
      }
    }
  }
  //UseSelector

  let formData = new FormData()
  const allResponsible = Responsible.map(({ value }) => ({
    member_id: value,
    member_type: 'Ответственный',
  }))
  const allCoWorkers = CoWorker.map(({ value }) => ({
    member_id: value,
    member_type: 'Соисполнитель',
  }))
  const allWatchers = Watchers.map(({ value }) => ({
    member_id: value,
    member_type: 'Наблюдатель',
  }))

  const selectedPeople = [...allResponsible, ...allCoWorkers, ...allWatchers]

  return (
    <div className={styles.task_wrapper}>
      <form>
        <div className={styles.task_heading}>
          <div className={styles.added_raport}>
            {typestatement === undefined ? (
              ''
            ) : (
              <>
                <h4
                  style={{ paddingBottom: '15px' }}
                >{`Прикрепленный документ: ${typestatement}`}</h4>
              </>
            )}
          </div>
          <div className={styles.task_heading_top}>
            <input
              id="title"
              name="title"
              placeholder="Введите название задачи"
              className={styles.title_input}
              value={task_name}
              onChange={(e) => setTaskName(e.target.value)}
              maxLength={18}
            />
            <div className={styles.task_heading_right}>
              <div className={styles.checkbox}>
                <input
                  id="important"
                  name="title"
                  type="checkbox"
                  className={styles.title_input_check}
                  checked={is_critical}
                  onChange={() => setIsCriticalChecked(!is_critical)}
                />
                <span>Это важная задача</span>
              </div>
            </div>
          </div>
          <textarea
            id="discription"
            name="discription"
            className={styles.discription_input}
            maxLength={2000}
            placeholder="Описание"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault() // Предотвращаем стандартное поведение
                setDescription(description + '\n') // Добавляем символ новой строки к описанию
              }
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.task_options}>
          <TaskResponsible
            dataResponsible={data}
            setResponsible={setResponsible}
            isMilti={true}
            text={'Ответственный *'}
          />
          <TaskWatchers dataWatchers={data} setWatchers={setWatchers} />
          <TaskCoWorker dataCoWorker={data} setCoWorker={setCoWorker} />
          {/* <TaskDirector dataDirector={data} setDirector={setDirector} /> */}
          <TaskDeadline
            setIsAllowChange={setIsAllowChange}
            setisSkipDayOff={setisSkipDayOff}
            setIsCheckFinish={setIsCheckFinish}
            setIsDeterm={setIsDeterm}
            setDeadlineDate={setDeadlineDate}
            showChecks={true}
          />

          {/* <TaskResult setIsReportFinish={setIsReportFinish} /> */}
        </div>
        <div className={styles.task_footer}>
          {loader ? (
            <ScaleLoader color="white" size={30} />
          ) : (
            <Button className={styles.btn1} onClick={handleSubmit}>
              Создать задачу
            </Button>
          )}
        </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default React.memo(TaskForm)
