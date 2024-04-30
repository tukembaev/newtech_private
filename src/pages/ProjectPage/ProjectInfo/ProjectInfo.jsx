import React, { useEffect, useState } from 'react'
import styles from './ProjectInfo.module.scss'
import { Button, Layout } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import Notification from 'utils/Notifications'
import { useDispatch } from 'react-redux'
import right from 'assets/icons/chevron_right.png'
import pencil from 'assets/icons/pencil.svg'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getProjectsInfo,
  patchProjectsInfo,
} from 'service/ProjectService'
import userInfo from 'utils/userInfo'
import { Slider } from '@mui/material'
import { setProjectInfo } from 'store/slices/ProjectSlice'
import { getCurrentDate } from 'utils/todayDateForInput'
const ProjectInfo = () => {
  const [openModal, setOpenModal] = useState(false)
  const [additionalModal, setAdditionalModal] = useState(false)
  const [isIncome, setIsIncome] = useState(false)
  const [text, setText] = useState('')
  const [render, setRender] = useState(false)
  let [budget, setBudget] = useState('')
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [deadline_date, setDeadlineDate] = useState(null)
  const { id } = useParams()

  const [data, setData] = useState('')

  const getData = async () => {
    try {
      let response = await getProjectsInfo(id, data)

      setData(response.data)
      dispatch(
        setProjectInfo({
          projectInfo: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const handleBudget = (e) => {
    let input = e.target.value
    let filteredInput = input.replace(/\D/g, '')
    input = input.slice(0, 4)
    setBudget(filteredInput)
  }
  let status_text
  const updateStatus = async (status_text) => {
    let newStatus = { status: status_text }

    let response = await patchProjectsInfo(id, newStatus)

    setRender(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!text) {
      setNotify({
        isOpen: true,
        message: 'Введите название этапа',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        let budgetInt = parseInt(budget)
        let response = await patchProjectsInfo(id, {
          stages: [
            { budget: budgetInt, title: text, deadline_date: deadline_date },
          ],
        })

        setNotify({
          isOpen: true,
          message: 'Этап успешно добавлен',
          type: 'success',
          sound: 'success',
        })
        setRender(true)
        setBudget('')
        setText('')
        setDeadlineDate('')
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
  }

  const handleAdditionalSubmit = async (event) => {
    event.preventDefault()
    let budgetInt = parseInt(budget)
    if (budgetInt <= 0) {
      setNotify({
        isOpen: true,
        message: 'Прибыль меньше или равна нулю',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        if (isIncome) {
          let response = await patchProjectsInfo(id, {
            amount_to_transfer: budget,
          })

          setNotify({
            isOpen: true,
            message: 'Бюджет увеличен',
            type: 'success',
            sound: 'success',
          })
          setRender(true)
          setAdditionalModal(false)
          setBudget(null)
        } else {
          let response = await patchProjectsInfo(id, {
            additional_budget: budgetInt,
          })

          setNotify({
            isOpen: true,
            message: 'Бюджет увеличен',
            type: 'success',
            sound: 'success',
          })
          setRender(true)
          setAdditionalModal(false)
          setBudget(null)
          setText('')
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

  const user = userInfo()
  const allTasksCompleted = data?.stages?.every(
    (item) => item.status === 'Завершен',
  )
  const handleChangeBudget = (event, newValue) => {
    setBudget(newValue)
  }
  const handleInputChange = (event) => {
    setBudget(event.target.value === '' ? '' : Number(event.target.value))
  }
  const handleBlur = () => {
    if (budget < 0) {
      setBudget(0)
    } else if (budget > data?.accounting?.current_budget) {
      setBudget(data?.accounting?.current_budget)
    }
  }

  return (
    <Layout>
      <div className={styles.project__wrapper}>
        <div className={styles.project__header}>
          <div className={styles.title}>
            <span
              onClick={() => navigate('/project')}
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
            <span style={{ color: '#090909' }}>{data?.title}</span>
          </div>
        </div>
        <div className={styles.project__header2}>
          <div className={styles.head}>
            <h3>Проект</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              {(data?.responsible_name?.includes(user.surName) &&
                data.status !== 'Завершен') ||
              (data?.creator_name?.includes(user.surName) &&
                data.status !== 'Завершен') ? (
                  <button
                  onClick={() => setOpenModal(true)}
                  style={{ display: 'flex', background: '#0094FF' }}
                >
                    <img src={pencil} alt="" />{' '}
                    <p style={{ paddingTop: '4px', paddingLeft: '4px' }}>
                      Добавить этап{' '}
                    </p>
                  </button>
              ) : (
                ''
              )}

              {(data?.responsible_name?.includes(user.surName) &&
                data.status !== 'Завершен') ||
              (data?.creator_name?.includes(user.surName) &&
                data.status !== 'Завершен') ? (
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
              ) : (
                ''
              )}

              {(data?.responsible_name?.includes(user.surName) ||
                data?.creator_name?.includes(user.surName)) &&
              allTasksCompleted &&
              data.status !== 'Завершен' ? (
                <button
                  onClick={() => {
                    updateStatus((status_text = 'Завершен'))
                  }}
                >
                  Завершить
                </button>
              ) : null}
              <button onClick={() => navigate(`/project-expanses/${data.id}`)}>
                История расходов и прибыли
              </button>
            </div>
          </div>
          <div className={styles.middle}>
            <h2 style={{ fontSize: '36px', fontWeight: '800' }}>
              {data?.title}
            </h2>
            <h3>Планируемый срок завершения: {data?.deadline_date}</h3>
          </div>
          <div className={styles.bottom}>
            <h3>{data?.status}</h3>
            {data?.responsible_name?.includes(user.surName) ||
            (data?.creator_name?.includes(user.surName) &&
              data.status !== 'Завершен') ? (
                <div
                className={styles.bottom}
                style={{
                  display: 'flex',
                  gap: '45px',
                  paddingTop: '15px',
                  justifyContent: 'right',
                }}
              >
                  <h3>
                    Начальный бюджет: {data.accounting?.initial_budget}
                    {data.accounting?.additional_budget === '0.00' ? null : (
                      <span
                      style={{ color: 'green' }}
                    >{`(+${data.accounting?.additional_budget})`}</span>
                  )}
                    {data.status !== 'Завершен' ? (
                      <img
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      onClick={() => {
                        setAdditionalModal(true)
                        setIsIncome(false)
                      }}
                      src={pencil}
                      alt=""
                    />
                  ) : null}
                  </h3>
                  <h3>Текущий бюджет: {data.accounting?.current_budget}</h3>
                  <h3>Расходы: {data.accounting?.expenses}</h3>

                  <h3>
                    Прибыль: {data.accounting?.income}{' '}
                    {data.status !== 'Завершен' ? (
                      <img
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      onClick={() => {
                        setAdditionalModal(true)
                        setIsIncome(true)
                      }}
                      src={pencil}
                      alt=""
                    />
                  ) : null}{' '}
                  </h3>
                </div>
            ) : (
              ''
            )}
          </div>
          <h3 style={{ marginTop: '15px' }}>
            Процесс-менеджер: {data.responsible_name}
          </h3>
        </div>
        <div className={styles.project__header3}>
          <div className={styles.title3}>
            <h5>Мои этапы</h5>
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
                  <span className={styles.table__title}>Ответственный </span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Поставлена</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Крайний срок</span>
                </th>
                {data?.responsible_name?.includes(user.surName) ||
                data?.creator_name?.includes(user.surName) ? (
                  <>
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
                  </>
                ) : (
                  ''
                )}
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Участников</span>
                </th>
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {/* Участники с is_confirmed: true */}
              {data &&
                data?.stages?.map((item) => (
                  <tr
                    className={styles.table__row}
                    onClick={
                      data.status.includes('Ждет выполнения с') &&
                      item.status !== 'Завершен'
                        ? null
                        : () => navigate(`/stage-info/${item.id}`)
                    }
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
                      <span className={styles.table__title}>
                        {data.status.includes('Ждет выполнения с') &&
                        item.status !== 'Завершен'
                          ? 'Приостановлен'
                          : item.status}
                      </span>
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
                    </td>
                    {data?.responsible_name?.includes(user.surName) ||
                    data?.creator_name?.includes(user.surName) ? (
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
                      ''
                    )}
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

      <ModalWindow
        setOpenModal={setAdditionalModal}
        openModal={additionalModal}
        modalTitle={'Добавить бюджет в проект'}
        width={'unset'}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className={styles.decline_form}>
            {isIncome ? (
              <div className={styles.item_flex1}>
                <div className={styles.input_type3}>
                  <h3>Отправить из прибыли в текущий бюджет:</h3>

                  <Slider
                    value={budget}
                    onChange={handleChangeBudget}
                    m
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    max={data?.accounting?.income}
                  />
                  <input
                    className={styles.discription_input}
                    placeholder={`Прибыль проекта : ${data.accounting?.income} `}
                    value={budget}
                    onChange={handleBudget}
                    maxLength={18}
                    max={18}
                    onKeyPress={(e) => {
                      // Проверка, что введенное значение является числом и не превышает 5
                      if (
                        isNaN(e.key) ||
                        parseInt(e.target.value + e.key, 10) >
                          data.accounting?.income
                      ) {
                        e.preventDefault()
                      }
                    }}
                    required
                  />
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    onClick={() => {
                      setAdditionalModal(false)
                      setBudget('')
                    }}
                    className={styles.btn_pin_close}
                  >
                    Закрыть
                  </Button>
                  <Button
                    onClick={handleAdditionalSubmit}
                    className={styles.btn_pin}
                  >
                    Создать
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.item_flex1}>
                <div className={styles.input_type3}>
                  <input
                    className={styles.discription_input}
                    placeholder={`Текущий бюджет : ${data.accounting?.current_budget}`}
                    value={budget}
                    onChange={handleBudget}
                    maxLength={18}
                    max={18}
                    required
                  />
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    onClick={() => {
                      setAdditionalModal(false)
                      setBudget('')
                    }}
                    className={styles.btn_pin_close}
                  >
                    Закрыть
                  </Button>
                  <Button
                    onClick={handleAdditionalSubmit}
                    className={styles.btn_pin}
                  >
                    Создать
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalWindow>

      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal}
        modalTitle={'Название нового этапа'}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <input
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  className={styles.discription_input}
                  placeholder="Название"
                  required
                />
                <h3 style={{ textAlign: 'center', padding: '5px 0' }}>
                  Бюджет:
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '48%',
                    }}
                  >
                    <input
                      className={styles.discription_input}
                      placeholder={`Бюджет этапа : ${data.accounting?.current_budget} `}
                      value={budget}
                      onChange={handleBudget}
                      maxLength={18}
                      max={18}
                      onKeyPress={(e) => {
                        // Проверка, что введенное значение является числом и не превышает 5
                        if (
                          isNaN(e.key) ||
                          parseInt(e.target.value + e.key, 10) >
                            data.accounting?.current_budget
                        ) {
                          e.preventDefault()
                        }
                      }}
                      required
                    />
                  </div>

                  <div
                    style={{
                      width: '48%',
                      paddingTop: '5px',
                    }}
                  >
                    <Slider
                      value={budget}
                      onChange={handleChangeBudget}
                      m
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      max={data?.accounting?.current_budget}
                    />
                  </div>
                </div>
                <div>
                  <h4 style={{ padding: '5px 0' }}>Крайний срок</h4>
                  <input
                    type="date"
                    style={{ width: '100%', paddingRight: '10px' }}
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                setOpenModal(false)
                setBudget('')
              }}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button onClick={handleSubmit} className={styles.btn_pin}>
              Создать
            </Button>
          </div>
        </div>
      </ModalWindow>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default ProjectInfo
