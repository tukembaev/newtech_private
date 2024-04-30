import { useEffect, useState } from 'react'

import styles from './SubTaskForm.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { TextField } from '@mui/material'

import deleteIcon from 'assets/icons/trash_del.svg'
import { Button } from 'components'
import DropdownResourse from 'components/Dropdown/DropdownResourse'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useNavigate } from 'react-router-dom'
import { getMyMembers } from 'service/CollectiveService'
import {
    createSubTask,
    createSubTaskForSubTask
} from 'service/TaskService'
import { setMyMembers } from 'store/slices/CollectiveSlice'
import {
    setSubTask,
    setSubTaskforSubTask
} from 'store/slices/TaskSlice'
import Notification from 'utils/Notifications'
import TaskCoWorker from '../TaskCoWorker/TaskCoWorker'
import TaskDeadline from '../TaskDeadline/TaskDeadline'
import TaskResponsible from '../TaskResponsible/TaskResponsible'
import TaskWatchers from '../TaskWatchers/TaskWatchers'
function SubTaskForm({ task, setState, isSubTask }) {
  //UseState
  const [idRes, setIdRes] = useState()
  const [taskIdRes, setTaskIdRes] = useState()
  const [titleRes, setTitleRes] = useState()
  const [remain, setRemain] = useState('')
  const [unit, setUnit] = useState('')

  const [resources, setResources] = useState([])
  const [selectedResources, setSelectedResources] = useState([])
  const [quantity, setQuantity] = useState(1)

  const [task_name2, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [Responsible, setResponsible] = useState([])
  const [CoWorker, setCoWorker] = useState([])
  const [Watchers, setWatchers] = useState([])
  const [deadline_date, setDeadlineDate] = useState(null)
  const { loading, withLoading } = useLoading(false)
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  //Dispatch & Navigate & Params
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  //Functions
  const getData = async () => {
    try {
      let response = await getMyMembers('task', data)

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
  }, [])

  const myTeam = useSelector((state) => state.collective.members)

  const data = [myTeam?.confirmed]

  const responsibleMan = {
    member_id: Responsible.value,
    member_type: 'Ответственный',
  }
  const allCoWorkers = CoWorker.map(({ value }) => ({
    member_id: value,
    member_type: 'Соисполнитель',
  }))
  const allWatchers = Watchers.map(({ value }) => ({
    member_id: value,
    member_type: 'Наблюдатель',
  }))

  const selectedPeople = [responsibleMan, ...allCoWorkers, ...allWatchers]

  let SubTaskInfo = [
    {
      members_subtask: selectedPeople,
      subtask_name: task_name2,
      description: description,
      deadline_date: deadline_date,
      resources: resources,
    },
  ]

  const handleSubmit = async (event, task) => {
    event.preventDefault()

    if (task_name2 === '') {
      setNotify({
        isOpen: true,
        message: 'Введите название подзадачи',
        type: 'warning',
        sound: 'warning',
      })
    } else if (Responsible.id === undefined) {
      setNotify({
        isOpen: true,
        message: 'Выберите ответственного',
        type: 'warning',
        sound: 'warning',
      })
    } else if (isSubTask === false) {
      try {
        await withLoading(async () => {
          let newSubTask = {
            deadline_date: task.deadline_date,
            subtasks: SubTaskInfo,
          }

          let response = await createSubTask(id, newSubTask)

          dispatch(setSubTask(response.data))
          setNotify({
            isOpen: true,
            message: 'Подзадача успешно создана',
            type: 'success',
            sound: 'success',
          })

          setState({ isPaneOpen: false })
        })
      } catch (error) {
        console.log(error.response)
      }
    } else {
      try {
        await withLoading(async () => {
          let newSubTask = {
            deadline_date: deadline_date,
            sub_subtasks: SubTaskInfo,
          }

          let response = await createSubTaskForSubTask(id, newSubTask)

          dispatch(setSubTaskforSubTask(response.data))
          setNotify({
            isOpen: true,
            message: 'Подзадача успешно создана',
            type: 'success',
            sound: 'success',
          })

          setState({ isPaneOpen: false })
        })
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const [is_critical, setIsCriticalChecked] = useState(false)
  const [allow_change_deadline, setIsAllowChange] = useState(false)
  const [skip_dayoffs, setisSkipDayOff] = useState(false)

  const [check_after_finish, setIsCheckFinish] = useState(false)
  const [determ_by_subtasks, setIsDeterm] = useState(false)
  const [report_after_finish, setIsReportFinish] = useState(false)

  const [request_type, setRequestType] = useState([])
  useEffect(() => {
    // Transform the 'resources' array into the desired structure
    const transformedResources = task?.resources?.map((resource) => ({
      id: resource.id,
      label: resource.resource_title,
      remain: resource.remain,
      unit:
        resource.unit === 'kg'
          ? 'кг'
          : resource.unit === 'g'
            ? 'грамм'
            : resource.unit === 'l'
              ? 'литр'
              : resource.unit === 'ml'
                ? 'миллилитр'
                : 'шт',
    }))

    // Set the state with the transformed resources
    setRequestType(transformedResources)
  }, [])

  const handleChange = (event, newValue) => {
    setQuantity(newValue)
  }

  const handleAddResource = (e) => {
    e.preventDefault()
    // Проверяем, что значения idRes и remain не пустые перед добавлением
    if (idRes && remain !== '') {
      // Создаем новый объект с данными и добавляем его в массив ресурсов
      let idResInt = parseInt(idRes)
      debugger
      const newResource = {
        task_resource: idResInt,
        quantity: quantity,
      }
      const output = {
        resource: idResInt,
        title: titleRes,
        quantity: quantity,
        unit: unit,
      }
      setSelectedResources((prevResources) => [...prevResources, output])

      setResources((prevResources) => [...prevResources, newResource])

      setIdRes('')
      setQuantity('')
      setTitleRes('')
      setRemain('')
      setUnit('')
    }
  }
  const handleInput = (e) => {
    if (Number(e.target.value) <= remain) {
      setQuantity(Number(e.target.value))
    }
    return
  }
  const handleRemoveResource = (id) => {
    // Создаем копию массива selectedResources и фильтруем его, оставляя только элементы с другим id
    const updatedSelectedResources = selectedResources.filter(
      (item) => item.resource !== id,
    )

    // Обновляем состояние selectedResources, чтобы отобразить изменения в UI
    setSelectedResources(updatedSelectedResources)

    // Теперь также нужно обновить массив resources, чтобы удалить соответствующий ресурс
    const updatedResources = resources.filter((item) => item.resource !== id)

    // Обновляем состояние resources
    setResources(updatedResources)
  }

  return (
    <div className={styles.task_wrapper}>
      <form>
        <div className={styles.task_heading}>
          <div className={styles.task_heading_top}>
            <input
              id="title"
              name="title"
              placeholder="Введите название подзадачи"
              className={styles.title_input}
              value={task_name2}
              onChange={(e) => setTaskName(e.target.value)}
              maxLength={18}
            />
          </div>
          <div className={styles.task_heading_bot}>
            <input
              id="discrip"
              name="discrip"
              placeholder="Описание подзадачи"
              maxLength={2000}
              className={styles.title_input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.task_options}>
          <TaskResponsible
            dataResponsible={data}
            setResponsible={setResponsible}
            IsMilti={false}
            text={'Ответственный'}
          />
          <TaskWatchers dataWatchers={data} setWatchers={setWatchers} />
          <TaskCoWorker dataCoWorker={data} setCoWorker={setCoWorker} />
          <TaskDeadline
            setIsAllowChange={setIsAllowChange}
            setisSkipDayOff={setisSkipDayOff}
            setIsCheckFinish={setIsCheckFinish}
            setIsDeterm={setIsDeterm}
            setDeadlineDate={setDeadlineDate}
            showChecks={false}
          />
        </div>

        {request_type.length === 0 ? null : (
          <div className={styles.task_options} style={{ marginTop: '5px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '15px',
                }}
              >
                <h4 style={{ paddingTop: '15px' }}>
                  Добавление ресурсов к задаче
                </h4>
                <div className={styles.task_resourses}>
                  <DropdownResourse
                    selected={titleRes}
                    setSelected={setTitleRes}
                    setQuantity={setQuantity}
                    setId={setIdRes}
                    setRemain={setRemain}
                    setUnit={setUnit}
                    title={'Вид'}
                    data={request_type ?? []}
                  />
                  <TextField
                    onChange={handleInput}
                    InputProps={{
                      inputProps: { min: '0', max: remain, step: '1' },
                    }}
                    value={quantity}
                    className={styles.task_number}
                  />
                  <Button className={styles.btn1} onClick={handleAddResource}>
                    Добавить ресурс
                  </Button>
                </div>
              </div>
              <div style={{ marginTop: '15px' }}>
                {selectedResources.map((item) => (
                  <div
                    key={item.resource}
                    style={{ display: 'flex', gap: '15px' }}
                  >
                    <h4>
                      {item.title} : {item.quantity} {item.unit}
                    </h4>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault()
                        handleRemoveResource(item.resource)
                      }}
                    >
                      <img
                        src={deleteIcon}
                        className={styles.size}
                        alt="Удалить"
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={styles.task_footer}>
          <ButtonLoader loading={loading} position={'left'}>
            <Button
              className={styles.btn1}
              style={{ padding: '10px' }}
              onClick={(event) => {
                handleSubmit(event, task)
              }}
            >
              Создать подзадачу
            </Button>
          </ButtonLoader>
        </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default SubTaskForm
