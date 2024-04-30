import { useEffect, useState } from 'react'
import { Button, Layout } from 'components'
import styles from './TrainingAllMembers.module.scss'

import { useDispatch, useSelector } from 'react-redux'

import right from 'assets/icons/chevron_right.png'

import { useNavigate, useParams } from 'react-router-dom'
import TaskStageForm from 'components/Forms/TaskForm/TaskStageForm'
import {
  getStageInfo,
  patchStageInfo
} from 'service/ProjectService'
import {
  setStageInfo
} from 'store/slices/ProjectSlice'
import Notification from 'utils/Notifications'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import userInfo from 'utils/userInfo'

const TrainingAllTasks = () => {
  const [openModal, setOpenModal] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })
  const { id } = useParams()
  const [render, setRender] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }
  const navigate = useNavigate()

  const dispatch = useDispatch()

  let dataRes

  const [memberArray, setMemberArray] = useState()

  const getData = async () => {
    try {
      let response = await getStageInfo(id, dataRes)

      dispatch(
        setStageInfo({
          stageInfo: response.data,
        }),
      )
      if (response.data.parent !== undefined) {
        let response2 = await getStageInfo(response.data.parent, dataRes)
        setMemberArray(response2.data.members)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const data = useSelector((state) => state.project.stageInfo)
  const members = useSelector((state) => state.project.stageInfo)

  const user = userInfo()
  const roleInProject = memberArray?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.role
  const statusInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.status
  const [request_type, setRequestType] = useState([])

  // Transform the 'resources' array into the desired structure
  let status_text
  const updateStatus = async (status_text) => {
    let newStatus = { status: status_text }

    let response = await patchStageInfo(id, newStatus)

    setRender(true)
  }

  const allTasksCompleted = data?.tasks?.every(
    (item) => item.status === 'Завершена',
  )
  // Set the state with the transformed resources
  const transformedData = memberArray?.map((item) => ({
    id: item.user_id,
    label: item.employee_name,
    value: item.user_id,
  }))

  return (
    <Layout>
      <div className={styles.team__wrapper}>
        <div className={styles.team__header}>
          <div className={styles.title}>
            <span onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
              Назад
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

            <span style={{ color: '#090909' }}>{data.title}</span>
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
        <div className={styles.member_add_header}>
          <div>
            <h3>
              {data.title} ({data.status})
            </h3>
            <input
              className={styles.search}
              placeholder="Поиск по названию"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {data?.creator_name?.includes(user.surName) ||
          roleInProject === 'Ментор' ? (
            <div style={{ display: 'flex', gap: '15px' }}>
              {data.status !== 'Завершен' ? (
                <>
                  <Button
                    className={styles.btn2}
                    onClick={() => {
                      updateStatus(
                        data?.status?.includes('Ждет выполнения с')
                          ? (status_text = 'В процессе выполнения')
                          : (status_text = 'Приостановлен'),
                      )
                    }}
                  >
                    {data?.status?.includes('Ждет выполнения с')
                      ? 'Начать'
                      : 'Приостановить'}
                  </Button>
                  <button onClick={() => setState({ isPaneOpen: true })}>
                    Поставить задачу
                  </button>
                </>
              ) : null}

              {allTasksCompleted && data.status !== 'Завершен' ? (
                <button
                  onClick={() => {
                    updateStatus((status_text = 'Завершен'))
                  }}
                >
                  Завершить
                </button>
              ) : null}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.team__body}>
          <table className={styles.table__wrapper}>
            <thead className={styles.table__head}>
              <tr className={styles.table__row}>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Заголовок</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Статус </span>
                </th>

                <th className={styles.table__item}>
                  <span className={styles.table__title}>Крайний срок</span>
                </th>

                <th className={styles.table__item}>
                  <span className={styles.table__title}>Участников</span>
                </th>
                {roleInProject === 'Бухгалтер' &&
                statusInProject !== 'неактивен' ? (
                  <th className={styles.table__item}>
                    <span className={styles.table__title}></span>
                  </th>
                ) : (
                  ''
                )}
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {/* Участники с is_confirmed: true */}
              {data &&
                data?.tasks
                  ?.filter((item) =>
                    item.task_name.toLowerCase().includes(searchTerm),
                  )
                  .map((item) => (
                    <tr
                      className={styles.table__row}
                      onClick={() => navigate(`/task/${item.id}`)}
                      style={
                        roleInProject === 'Бухгалтер' &&
                        item?.accounting?.income_confirmed === false
                          ? { backgroundColor: '#f0eb1499' }
                          : {}
                      }
                    >
                      <td className={styles.table__item}>
                        <span
                          className={styles.table__title}
                          style={{ fontWeight: '700' }}
                        >
                          {item.task_name}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.status}
                        </span>
                      </td>

                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {' '}
                          {item.deadline_date === null
                            ? 'Бессрочная'
                            : item.deadline_date}
                        </span>
                      </td>

                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.members_count}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {width > 600 ? (
        <SlidingPaneUtil
          size="50%"
          title="Новая задача"
          state={state}
          setState={setState}
        >
          {' '}
          <TaskStageForm
            memberArray={transformedData}
            budgetForTask={null}
            stage_id={members.id}
            setRender={setRender}
            setState={setState}
            request_type={null}
          />{' '}
        </SlidingPaneUtil>
      ) : (
        <SlidingPaneUtil
          size="100%"
          title="Новая задача"
          state={state}
          setState={setState}
        >
          {' '}
          <TaskStageForm
            memberArray={transformedData}
            budgetForTask={null}
            stage_id={members.id}
            setRender={setRender}
            setState={setState}
            request_type={null}
          />{' '}
        </SlidingPaneUtil>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default TrainingAllTasks
