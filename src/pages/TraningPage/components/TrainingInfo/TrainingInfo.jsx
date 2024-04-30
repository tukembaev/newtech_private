import { Button, Layout } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import { useEffect, useState } from 'react'
import styles from './TrainingInfo.module.scss'

import { useDispatch, useSelector } from 'react-redux'

import right from 'assets/icons/chevron_right.png'

import { useNavigate, useParams } from 'react-router-dom'


import {
  getStageInfo,
  patchStageInfo,
  patchStageInfoFormData
} from 'service/ProjectService'
import {
  setStageInfo
} from 'store/slices/ProjectSlice'
import { getCurrentDate } from 'utils/todayDateForInput'
import userInfo from 'utils/userInfo'
import StageDocuments from 'pages/ProjectPage/ProjectInfo/StageInfo/components/StageDocuments'
const TrainingInfo = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [text, setText] = useState('')
  const [deadline_date, setDeadlineDate] = useState(null)
  const [additionalModal, setAdditionalModal] = useState(false)
  let [budget, setBudget] = useState(null)
  const [render, setRender] = useState(false)
  const [files, setFiles] = useState([])
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const user = userInfo()
  const onFileChange = (e) => {
    setFiles(e.target.files[0])
  }
  let dataRes

  const getData = async () => {
    try {
      let response = await getStageInfo(id, dataRes)

      dispatch(
        setStageInfo({
          stageInfo: response.data,
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

  const data = useSelector((state) => state.project.stageInfo)

  const projectInfo = useSelector((state) => state.project.projectInfo)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const formData = new FormData()

      let response = await patchStageInfoFormData(id, {
        uploaded_files: files,
      })

      setNotify({
        isOpen: true,
        message: 'Документ добавлен',
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

  const handleSubmitStage = async (event) => {
    event.preventDefault()
    if (text === '') {
      setNotify({
        isOpen: true,
        message: 'Введите название этапа',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        let response = await patchStageInfo(id, {
          stages: [
            {
              title: text,
              deadline_date: deadline_date,
            },
          ],
        })

        setNotify({
          isOpen: true,
          message: 'Этап успешно добавлен',
          type: 'success',
          sound: 'success',
        })

        setRender(true)
        setOpenModal2(false)
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

  let status_text
  const updateStatus = async (status_text) => {
    let newStatus = { status: status_text }

    let response = await patchStageInfo(id, newStatus)

    setRender(true)
  }
  const roleInProject = data?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.role

  const handleAdditionalSubmit = async (event) => {
    event.preventDefault()
    try {
      let budgetInt = parseInt(budget)
      let response = await patchStageInfo(id, {
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
  const handleChangeBudget = (event, newValue) => {
    setBudget(newValue)
  }

  return (
    <Layout>
      <div>
        <div className={styles.project__header}>
          <div className={styles.title}>
            <span onClick={() => navigate('/flow/')}>Потоки</span>
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
        <div className={styles.project__wrapper}>
          <div className={styles.left_side}>
            <StageDocuments
              data={data.files}
              setOpenModal={setOpenModal}
              status={data.status}
            />
          </div>
          <div className={styles.right_side}>
            <div className={styles.project__header2}>
              <div className={styles.head}>
                <h3>Поток</h3>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {data?.creator_name?.includes(user.surName) &&
                  data.status !== 'Завершен' ? (
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
                  {data.status !== 'Завершена' ? (
                    <button onClick={() => setOpenModal2(true)}>
                      Добавить этап
                    </button>
                  ) : null}

                  {data?.creator_name?.includes(user.surName) &&
                  data?.stages?.every((task) => task.status === 'Завершена') &&
                  data.status !== 'Завершен' ? (
                    <>
                      <button
                        onClick={() => {
                          updateStatus((status_text = 'Завершен'))
                        }}
                      >
                        Завершить
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className={styles.middle}>
                <h2 style={{ fontSize: '36px', fontWeight: '800' }}>
                  {data?.title}
                </h2>
              </div>
              <div className={styles.bottom}>
                <h3>{data?.status}</h3>
                <h3>Планируемый срок завершения: {data?.deadline_date}</h3>
              </div>
            </div>
            <div className={styles.stage_bottom}>
              <div className={styles.employee_income_section}>
                <div className={styles.members_section}>
                  <div className={styles.project__header3}>
                    <div className={styles.title3}>
                      <h5>Участники</h5>
                    </div>
                    <div
                      className={styles.title3}
                      onClick={() => navigate(`/flow-info-members/${data.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <h5>Подробнее</h5>
                    </div>
                  </div>
                  <div className={styles.project__body}>
                    <table className={styles.table__wrapper}>
                      <thead className={styles.table__head}>
                        <tr
                          className={styles.table__row}
                          style={{ backgroundColor: '#F6F8F9' }}
                        >
                          <th className={styles.table__item}>
                            <span className={styles.table__title}>
                              Сотрудники
                            </span>
                          </th>
                          <th className={styles.table__item}>
                            <span className={styles.table__title}>Статус </span>
                          </th>
                          <th className={styles.table__item}>
                            <span className={styles.table__title}>Роль</span>
                          </th>

                          <th className={styles.table__item}>
                            <span className={styles.table__title}>
                              Электронный адрес
                            </span>
                          </th>
                        </tr>
                      </thead>

                      <tbody className={styles.table__body}>
                        {/* Участники с is_confirmed: true */}
                        {data?.members?.slice(0, 2).map((item) => (
                          <tr
                            className={styles.table__row}
                            style={{ backgroundColor: '#F6F8F9' }}
                          >
                            <td className={styles.table__item3}>
                              <img
                                src={item.image}
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
                                {item.employee_name}
                              </span>
                            </td>
                            <td className={styles.table__item3}>
                              {item.status === 'активен' ? (
                                <span
                                  className={styles.table__title3}
                                  style={{
                                    padding: '2px 14px 2px 14px',
                                    background: 'rgb(72 206 143 / 73%)',
                                    color: '#158318',
                                    borderRadius: '16px',
                                    fontSize: '14px',
                                  }}
                                >
                                  Active
                                </span>
                              ) : item.status === 'удален' ? (
                                <span
                                  className={styles.table__title3}
                                  style={{
                                    padding: '2px 14px 2px 14px',
                                    background: 'rgb(246 16 58 / 64%)',
                                    color: 'rgb(0 0 0);',
                                    borderRadius: '16px',
                                    fontSize: '14px',
                                  }}
                                >
                                  Removed
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
                                  Incative
                                </span>
                              )}
                            </td>
                            <td className={styles.table__item3}>
                              <span className={styles.table__title3}>
                                {item.role}
                              </span>
                            </td>
                            <td className={styles.table__item3}>
                              <span className={styles.table__title3}>
                                {item.email}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className={styles.task_section}>
                <div className={styles.project__header3}>
                  <div className={styles.title3}>
                    <h5>Этапы</h5>
                  </div>
                  <div
                    className={styles.title3}
                    onClick={() => navigate(`/flow-info-all/${data.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h5>Подробнее</h5>
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
                          <span className={styles.table__title}>Статус</span>
                        </th>
                        <th className={styles.table__item}>
                          <span className={styles.table__title}>
                            Крайний срок
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className={styles.table__body}>
                      {/* Участники с is_confirmed: true */}
                      {data?.stages?.map((item) => (
                        <tr
                          className={styles.table__row}
                          onClick={() =>
                            navigate(`/flow-info-lessons/${item.id}`)
                          }
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
                              {item.title}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {' '}
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal}
        modalTitle={'Добавление файла'}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <input type="file" onChange={onFileChange} />
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
            <Button onClick={handleSubmit} className={styles.btn_pin}>
              Создать
            </Button>
          </div>
        </div>
      </ModalWindow>

      <ModalWindow
        setOpenModal={setOpenModal2}
        openModal={openModal2}
        modalTitle={'Добавить этап'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15' }}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  className={styles.discription_input}
                  placeholder="Название"
                  required
                />

                <div style={{ marginTop: '15px' }}>
                  {' '}
                  <h4>Крайний срок</h4>
                  <input
                    type="date"
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
              onClick={() => setOpenModal2(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button onClick={handleSubmitStage} className={styles.btn_pin}>
              Создать
            </Button>
          </div>
        </div>
      </ModalWindow>
    </Layout>
  )
}

export default TrainingInfo
