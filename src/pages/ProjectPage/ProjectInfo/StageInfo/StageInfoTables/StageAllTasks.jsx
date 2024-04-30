import React, { useEffect, useState } from 'react'
import styles from './StageAllMembers.module.scss'
import { Layout } from 'components'
import { useSelector } from 'react-redux'
import right from 'assets/icons/chevron_right.png'
import agree from 'assets/icons/agree.png'
import { useNavigate, useParams } from 'react-router-dom'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import TaskStageForm from 'components/Forms/TaskForm/TaskStageForm'
import { updateStatusTask } from 'service/TaskService'

const StageAllTasks = () => {
  const [openModal, setOpenModal] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })

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

  const data = useSelector((state) => state.project.stageInfo)
  const members = useSelector((state) => state.project.stageInfo)
  const handleSubmit = async (e, id) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      let response = await updateStatusTask(id, { income_confirmed: true })

      setNotify({
        isOpen: true,
        message: 'Прибыль подтверждена',
        type: 'success',
        sound: 'success',
      })

      navigate(`/stage-info/${data.id}`)
    } catch (error) {
      console.log(error.response)

      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }
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

  const user = userInfo()
  const roleInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.role
  const statusInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.status
  const [request_type, setRequestType] = useState([])
  useEffect(() => {
    // Transform the 'resources' array into the desired structure
    const transformedResources = members?.resources?.map((resource) => ({
      id: resource.id,
      label: resource.title,
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
  console.log(statusInProject)
  return (
    <Layout>
      <div className={styles.team__wrapper}>
        <div className={styles.team__header}>
          <div className={styles.title}>
            <span
              onClick={() => navigate(`/project/`)}
              style={{ cursor: 'pointer' }}
            >
              Проекты
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
            <span
              onClick={() => navigate(`/project/${data.project}`)}
              style={{ cursor: 'pointer' }}
            >
              {data.project_title}
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
            <span
              onClick={() => navigate(`/stage-info/${data.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {data.title}
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
            <span style={{ color: '#090909' }}>Задачи</span>
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
            <h3>Все задачи</h3>
            <input
              className={styles.search}
              placeholder="Поиск по названию"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            {roleInProject === 'Таск-менеджер' ||
            roleInProject === 'Процесс-менеджер' ||
            (members?.creator_name?.includes(user.surName) &&
              members.status !== 'Завершен' &&
              members.status.includes('Ждет выполнения с') === false) ? (
                <button onClick={() => setState({ isPaneOpen: true })}>
                  Поставить задачу
                </button>
            ) : (
              ''
            )}
          </div>
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
                  <span className={styles.table__title}>Бюджет</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Расходы</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Остаток</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Прибыль</span>
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
                        item?.accounting?.income_confirmed === false &&
                        item.status === 'Завершена'
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
                          {item.accounting?.initial_budget}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.accounting?.expenses}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.accounting?.current_budget}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.accounting?.income}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.members_count}
                        </span>
                      </td>
                      {roleInProject === 'Бухгалтер' &&
                      item?.accounting?.income_confirmed === false &&
                      item.status === 'Завершена' ? (
                        <td className={styles.table__item}>
                          <span className={styles.table__title}>
                            <img
                              src={agree}
                              className={styles.size}
                              alt=""
                              onClick={(e) => handleSubmit(e, item.id)}
                            />
                          </span>
                        </td>
                      ) : (
                        ''
                      )}
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
            budgetForTask={members?.accounting?.current_budget}
            stage_id={members.id}
            setRender={setRender}
            setState={setState}
            request_type={request_type}
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
            budgetForTask={members?.accounting?.current_budget}
            stage_id={members.id}
            setRender={setRender}
            setState={setState}
            request_type={request_type}
          />{' '}
        </SlidingPaneUtil>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default StageAllTasks
