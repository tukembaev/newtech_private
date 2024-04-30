import React, { useEffect, useState } from 'react'
import styles from './StageInfo.module.scss'
import { Button, Layout } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import Notification from 'utils/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import right from 'assets/icons/chevron_right.png'
import pencil from 'assets/icons/pencil.svg'
import { useNavigate, useParams } from 'react-router-dom'
import StageResources from './components/StageResources'
import StageDocuments from './components/StageDocuments'
import userInfo from 'utils/userInfo'
import {
  getStageInfo,
  patchStageInfo,
  patchStageInfoFormData,
} from 'service/ProjectService'
import { setStageInfo } from 'store/slices/ProjectSlice'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
const StageInfo = () => {
  const [openModal, setOpenModal] = useState(false)
  const [additionalModal, setAdditionalModal] = useState(false)
  let [budget, setBudget] = useState(null)
  const [render, setRender] = useState(false)
  const [files, setFiles] = useState([])
  const { loading, withLoading } = useLoading(false)
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
      await withLoading(async () => {
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
      })
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
  let status_text
  const updateStatus = async (status_text) => {
    let newStatus = { status: status_text }

    let response = await patchStageInfo(id, newStatus)

    setRender(true)
  }
  const roleInProject = data?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.role
  const handleInputChange = (event) => {
    setBudget(event.target.value === '' ? '' : Number(event.target.value))
  }
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
      setBudget(null)
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

  const handleBlur = () => {
    if (budget < 0) {
      setBudget(0)
    } else if (budget > data?.accounting?.current_budget) {
      setBudget(data?.accounting?.current_budget)
    }
  }

  const handleChangeBudget = (event, newValue) => {
    setBudget(newValue)
  }
  const handleBudget = (e) => {
    let input = e.target.value
    let filteredInput = input.replace(/\D/g, '')
    input = input.slice(0, 4)
    setBudget(filteredInput)
  }

  return (
    <Layout>
      <div>
        <div className={styles.project__header}>
          <div className={styles.title}>
            <span onClick={() => navigate('/project/')}>Проекты</span>
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
              {' '}
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
            <StageResources
              id={data.id}
              data={data.resources}
              count={data.resources_count}
              role={
                roleInProject === 'Ресурс-менеджер'
                  ? true
                  : roleInProject === 'Процесс-менеджер'
                    ? true
                    : data?.creator_name?.includes(user.surName)
                      ? true
                      : false
              }
            />
            <StageDocuments
              data={data.files}
              setOpenModal={setOpenModal}
              status={data.status}
            />
          </div>
          <div className={styles.right_side}>
            <div className={styles.project__header2}>
              <div className={styles.head}>
                <h3>Этапы</h3>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {roleInProject === 'Процесс-менеджер' &&
                  data?.creator_name?.includes(user.surName) &&
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

                  {roleInProject === 'Процесс-менеджер' &&
                  data?.creator_name?.includes(user.surName) &&
                  data?.tasks?.every((task) => task.status === 'Завершена') &&
                  data.status !== 'Завершен' ? (
                    <button
                      onClick={() => {
                        updateStatus((status_text = 'Завершен'))
                      }}
                    >
                      Завершить
                    </button>
                  ) : (
                    ''
                  )}
                  <button
                    onClick={() => navigate(`/stage-expanses/${data.id}`)}
                  >
                    История расходов и прибыли
                  </button>
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
              {roleInProject === 'Бухгалтер' ||
              roleInProject === 'Процесс-менеджер' ||
              projectInfo?.creator_name?.includes(user.surName) ? (
                <div
                  className={styles.bottom}
                  style={{
                    display: 'flex',
                    gap: '65px',
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
                    )}{' '}
                    {data.status !== 'Завершен' ? (
                      <img
                        style={{ fontSize: '24px', cursor: 'pointer' }}
                        onClick={() => {
                          setAdditionalModal(true)
                        }}
                        src={pencil}
                        alt=""
                      />
                    ) : null}{' '}
                  </h3>
                  <h3>Текущий бюджет: {data.accounting?.current_budget} </h3>
                  <h3>Расходы: {data.accounting?.expenses}</h3>
                  <h3>Прибыль: {data.accounting?.income}</h3>
                </div>
              ) : (
                ''
              )}
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
                      onClick={() => navigate(`/stage-info-members/${data.id}`)}
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
                    <h5>Задачи</h5>
                  </div>
                  <div
                    className={styles.title3}
                    onClick={() => navigate(`/stage-info-tasks/${data.id}`)}
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
                        {roleInProject === 'Процесс-менеджер' ||
                        roleInProject === 'Бухгалтер' ||
                        (data?.creator_name?.includes(user.surName) &&
                          data?.tasks?.every(
                            (task) => task.status === 'Завершена',
                          )) ? (
                            <>
                              <th className={styles.table__item}>
                                <span className={styles.table__title}>
                                  Бюджет
                                </span>
                              </th>
                              <th className={styles.table__item}>
                                <span className={styles.table__title}>
                                  Прибыль
                                </span>
                              </th>
                              <th className={styles.table__item}>
                                <span className={styles.table__title}>
                                  Остаток
                                </span>
                              </th>
                            </>
                        ) : (
                          ''
                        )}
                        <th className={styles.table__item}>
                          <span className={styles.table__title}>
                            Участников
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className={styles.table__body}>
                      {data?.tasks?.map((item) => (
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
                          {roleInProject === 'Процесс-менеджер' ||
                          roleInProject === 'Бухгалтер' ||
                          data?.creator_name?.includes(user.surName) ? (
                            <>
                              <td className={styles.table__item}>
                                <span className={styles.table__title}>
                                  {' '}
                                  {item?.accounting?.initial_budget}
                                </span>
                              </td>
                              <td className={styles.table__item}>
                                <span className={styles.table__title}>
                                  {' '}
                                  {item?.accounting?.income}
                                </span>
                              </td>
                              <td className={styles.table__item}>
                                <span className={styles.table__title}>
                                  {' '}
                                  {item?.accounting?.current_budget}
                                </span>
                              </td>{' '}
                            </>
                          ) : (
                            ''
                          )}
                          {/* <td className={styles.table__item}>
                  <span className={styles.table__title}>         {item.accounting.income}</span>
                </td> */}
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {' '}
                              {item?.members_count}
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
        setOpenModal={setAdditionalModal}
        openModal={additionalModal}
        modalTitle={'Добавить бюджет этапа'}
        width={'unset'}
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
                <textarea
                  className={styles.discription_input}
                  placeholder={`Бюджет проекта : ${projectInfo.accounting?.current_budget} `}
                  value={budget}
                  onChange={handleBudget}
                  maxLength={18}
                  max={18}
                  onKeyPress={(e) => {
                    // Проверка, что введенное значение является числом и не превышает 5
                    if (
                      isNaN(e.key) ||
                      parseInt(e.target.value + e.key, 10) >
                        projectInfo.accounting?.current_budget
                    ) {
                      e.preventDefault()
                    }
                  }}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => {
                    setAdditionalModal(false)
                    setBudget(null)
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
          </div>
        </div>
      </ModalWindow>

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
            <ButtonLoader loading={loading} position={'center'}>
              <Button onClick={handleSubmit} className={styles.btn_pin}>
                Добавить
              </Button>
            </ButtonLoader>
          </div>
        </div>
      </ModalWindow>
    </Layout>
  )
}

export default StageInfo
