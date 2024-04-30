import React, { useEffect, useState } from 'react'
import styles from './ProjectPage.module.scss'
import { Button, Layout } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import { useDispatch, useSelector } from 'react-redux'
import right from 'assets/icons/chevron_right.png'
import del from 'assets/icons/trash_del.svg'
import { useNavigate } from 'react-router-dom'
import {
  createProject,
  deleteProject,
  getProjects,
} from 'service/ProjectService'
import userInfo from 'utils/userInfo'
import EmployeeSelectUserId from 'hooks/EmployeeSelect/EmployeeSelectUserId'
import { getCurrentDate } from 'utils/todayDateForInput'
import Notification from 'utils/Notifications'

const ProjectPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [text, setText] = useState('')
  const [data, setData] = useState('')
  const [render, setRender] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [budget, setBudget] = useState(0)
  const user = userInfo()
  const [deadline_date, setDeadlineDate] = useState(null)

  const getData = async () => {
    try {
      let response = await getProjects(data)
      setData(response.data.ALL)
      // dispatch(
      //   setProjects({
      //     projects: response.data.ALL,
      //   })
      // );
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const myProject = useSelector((state) => state.project)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (text === '') {
        setNotify({
          isOpen: true,
          message: 'Введите название проекта',
          type: 'warning',
          sound: 'warning',
        })
      } else {
        let budgetInt = parseInt(budget)
        let response = await createProject({
          budget: budgetInt,
          title: text,
          responsible: selectedEmployee,
          deadline_date: deadline_date,
        })

        setNotify({
          isOpen: true,
          message: 'Проект успешно создан',
          type: 'success',
          sound: 'success',
        })

        setRender(true)
        setOpenModal(false)
      }
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

  const handleDeleteSubmit = async (id) => {
    try {
      let response = await deleteProject(id)

      setNotify({
        isOpen: true,
        message: 'Проект успешно создан',
        type: 'success',
        sound: 'success',
      })

      setRender(true)
      setOpenModal(false)
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

  const handleBudget = (e) => {
    let input = e.target.value
    let filteredInput = input.replace(/\D/g, '')
    input = input.slice(0, 4)
    setBudget(filteredInput)
  }

  return (
    <Layout>
      <div className={styles.project__wrapper}>
        <div className={styles.project__header}>
          <div className={styles.title}>
            Проекты
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
          <button
            onClick={() => setOpenModal(true)}
            style={{ padding: '10px' }}
            className={styles.btn_pin}
          >
            Создать проект
          </button>
        </div>
        <div className={styles.project__header2}>
          <div className={styles.title2}>
            <h4>Мои проекты</h4>
          </div>
        </div>
        <div className={styles.project__body}>
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
                  <span className={styles.table__title}>Создал </span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Поставлена</span>
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
                  <span className={styles.table__title}></span>
                </th>
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {data &&
                data?.map((item) => (
                  <tr
                    className={styles.table__row}
                    style={{ zIndex: '1' }}
                    onClick={() => navigate(`/project/${item.id}`)}
                  >
                    <td className={styles.table__item}>
                      <span
                        className={styles.table__title}
                        style={{ fontWeight: '700' }}
                      >
                        {item.title}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.status}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.creator_name}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.create_date}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.deadline_date === null
                          ? 'Бессрочный'
                          : item.deadline_date}
                      </span>
                    </td>{' '}
                    {item?.creator_name?.includes(user.surName) ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}></span>
                        </td>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}></span>
                        </td>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}></span>
                        </td>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}></span>
                        </td>
                      </>
                    )}
                    {item.has_stages === true ? (
                      <td className={styles.table__item}>
                        <span className={styles.table__title}></span>
                      </td>
                    ) : (
                      <>
                        {item?.creator_name?.includes(user.surName) ? (
                          <>
                            <td className={styles.table__item}>
                              <span
                                className={styles.table__title}
                                style={{ zIndex: '2' }}
                                onClick={() => handleDeleteSubmit(item.id)}
                              >
                                <img src={del} className={styles.size} alt="" />
                              </span>
                            </td>
                          </>
                        ) : null}
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal}
        modalTitle={'Создание проекта'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15' }}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <input
                  onChange={(e) => setText(e.target.value)}
                  className={styles.discription_input}
                  placeholder="Название"
                  required
                />
                <div style={{ marginTop: '15px' }}>
                  {' '}
                  <h4>Выберите процесс-менеджера</h4>
                  <EmployeeSelectUserId
                    selectedEmployee={setSelectedEmployee}
                    setSelectedEmployeeLabel={setSelectedEmployeeLabel}
                    service={'project'}
                    isMulti={false}
                  />{' '}
                </div>
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <div style={{ marginTop: '15px', width: '50%' }}>
                    {' '}
                    <h4>Бюджет</h4>
                    <textarea
                      className={styles.discription_input}
                      placeholder="Бюджет"
                      value={budget}
                      onChange={handleBudget}
                      maxLength={18}
                      required
                    />
                  </div>

                  <div style={{ marginTop: '15px', width: '50%' }}>
                    {' '}
                    <h4>Крайний срок</h4>
                    <input
                      type="date"
                      style={{ width: '100%' }}
                      className={styles.discription_input}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      name=""
                      id=""
                      min={getCurrentDate()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                setOpenModal(false)
                setSelectedEmployee(null)
              }}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button
              onClick={handleSubmit}
              className={styles.btn_pin}
              style={{ marginTop: '15px' }}
            >
              Создать
            </Button>
          </div>
        </div>
      </ModalWindow>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default ProjectPage
