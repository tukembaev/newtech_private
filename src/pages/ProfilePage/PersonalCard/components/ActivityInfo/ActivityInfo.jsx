import pencil from 'assets/icons/pencil.svg'
import { useEffect, useState } from 'react'
import styles from './ActivityInfo.module.scss'

import deleteIcon from 'assets/icons/trash_del.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteActivities,
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'

const ActivityInfo = ({ data }) => {
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [total_experience, setTotal_experience] = useState(null)
  const [professional_experience, setProfessional_experience] = useState(null)
  const [public_service_experience, setPublic_service_experience] =
    useState(true)
  const [private_service_experience, setPrivate_service_experience] =
    useState(null)
  const [continuous_experience, setContinuous_experience] = useState(null)
  const [organization, setOrganization] = useState(null)
  const [position, setPosition] = useState(null)
  const [started, setStarted] = useState(null)
  const [ended, setEnded] = useState(null)
  const [employment_order, setEmployment_order] = useState(null)
  const [dismissal_order, setDismissal_order] = useState(null)
  const [staff, setStaff] = useState(null)

  const [english, setEnglish] = useState(false)
  const [total_experienceEn, setTotal_experienceEn] = useState(null)
  const [professional_experienceEn, setProfessional_experienceEn] =
    useState(null)
  const [public_service_experienceEn, setPublic_service_experienceEn] =
    useState(true)
  const [private_service_experienceEn, setPrivate_service_experienceEn] =
    useState(null)
  const [continuous_experienceEn, setContinuous_experienceEn] = useState(null)
  const [organizationEn, setOrganizationEn] = useState(null)
  const [positionEn, setPositionEn] = useState(null)
  const [startedEn, setStartedEn] = useState(null)
  const [endedEn, setEndedEn] = useState(null)
  const [employment_orderEn, setEmployment_orderEn] = useState(null)
  const [dismissal_orderEn, setDismissal_orderEn] = useState(null)
  const [staffEn, setStaffEn] = useState(null)

  const [kyrgyz, setKyrgyz] = useState(false)
  const [total_experienceKy, setTotal_experienceKy] = useState(null)
  const [professional_experienceKy, setProfessional_experienceKy] =
    useState(null)
  const [public_service_experienceKy, setPublic_service_experienceKy] =
    useState(true)
  const [private_service_experienceKy, setPrivate_service_experienceKy] =
    useState(null)
  const [continuous_experienceKy, setContinuous_experienceKy] = useState(null)
  const [organizationKy, setOrganizationKy] = useState(null)
  const [positionKy, setPositionKy] = useState(null)
  const [startedKy, setStartedKy] = useState(null)
  const [endedKy, setEndedKy] = useState(null)
  const [employment_orderKy, setEmployment_orderKy] = useState(null)
  const [dismissal_orderKy, setDismissal_orderKy] = useState(null)
  const [staffKy, setStaffKy] = useState(null)

  const [render, setRender] = useState(false)
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      let response = await getPersonalEmployee(data, 'ru')

      dispatch(
        setPersonalInfo({
          personal_info: response.data,
        }),
      )

      console.log(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const info = useSelector((state) => state.personalcard.personal_info)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await patchPersonalEmployee(
        {
          employment: {
            total_experience,
            professional_experience,
            public_service_experience,
            private_service_experience,
            continuous_experience,
            experiences: [
              {
                organization,
                position,
                started,
                ended,
                staff,
                employment_order,
                dismissal_order,
              },
            ],
          },
        },
        'ru',
      )

      if (english) {
        let responseEn = await patchPersonalEmployee(
          {
            employment: {
              total_experience: total_experienceEn,
              professional_experience: professional_experienceEn,
              public_service_experience: public_service_experienceEn,
              private_service_experience: private_service_experienceEn,
              continuous_experience: continuous_experienceEn,
              experiences: [
                {
                  organization: organizationEn,
                  position: positionEn,
                  started: startedEn,
                  ended: endedEn,
                  staff: staffEn,
                  employment_order: employment_orderEn,
                  dismissal_order: dismissal_orderEn,
                },
              ],
            },
          },
          'en',
        )
      }

      if (kyrgyz) {
        let responseKy = await patchPersonalEmployee(
          {
            employment: {
              total_experience: total_experienceKy,
              professional_experience: professional_experienceKy,
              public_service_experience: public_service_experienceKy,
              private_service_experience: private_service_experienceKy,
              continuous_experience: continuous_experienceKy,
              experiences: [
                {
                  organization: organizationKy,
                  position: positionKy,
                  started: startedKy,
                  ended: endedKy,
                  staff: staffKy,
                  employment_order: employment_orderKy,
                  dismissal_order: dismissal_orderKy,
                },
              ],
            },
          },
          'ky',
        )
      }

      setNotify({
        isOpen: true,
        message: 'Трудовая деятельность установлена',
        type: 'success',
        sound: 'success',
      })
      setRender(true)
      setChange(false)
    } catch (error) {
      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }

  const deleteUserInfo = async (id) => {
    try {
      let response = await deleteActivities(id)
      setNotify({
        isOpen: true,
        message: 'Успешно удалено',
        type: 'success',
        sound: 'success',
      })

      setRender(true)
    } catch (error) {
      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }
  return (
    <div className={styles.wrapper}>
      <div style={{ width: '100%', height: '100%' }}>
        {change ? (
          <div className={styles.Activity_true}>
            <div className={styles.ActivityHeader}>
              <div className={styles.header_left}>
                {/* <img onClick={() => setChange(false)}  alt="" className={styles.header_left_img} /> */}
                <h4 className={styles.header_left_info}>
                  Трудовая деятельность/Стаж работы{' '}
                </h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>

            <div className={styles.Activity_change_block}>
              <ul className={styles.Activity_desc}>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>По специальности</h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    value={professional_experience}
                    onChange={(e) => setProfessional_experience(e.target.value)}
                  />
                </li>

                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Общий стаж</h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    value={total_experience}
                    onChange={(e) => setTotal_experience(e.target.value)}
                  />
                </li>

                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>На гос.службе</h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    onChange={(e) =>
                      setPublic_service_experience(e.target.value)
                    }
                  />
                </li>

                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Частная структура</h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    onChange={(e) =>
                      setPrivate_service_experience(e.target.value)
                    }
                  />
                </li>

                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Непрерывный</h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    value={continuous_experience}
                    onChange={(e) => setContinuous_experience(e.target.value)}
                  />
                </li>
              </ul>

              <h3 className={styles.Activity_title_sec}>
                Выполняемая работа с начала трудовой деятельности
              </h3>

              <ul className={styles.Activity_desc}>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>
                    Занимаемая должность
                  </h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </li>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Штат</h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                  />
                </li>

                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>
                    Наименование организации
                  </h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </li>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Начало работы</h3>
                  <input
                    type="date"
                    className={styles.Activity_info_change_inp}
                    value={started}
                    onChange={(e) => setStarted(e.target.value)}
                  />
                </li>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>
                    Номер приказа начала работы
                  </h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    value={employment_order}
                    onChange={(e) => setEmployment_order(e.target.value)}
                  />
                </li>

                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Окончание работы</h3>
                  <input
                    type="date"
                    className={styles.Activity_info_change_inp}
                    value={ended}
                    onChange={(e) => setEnded(e.target.value)}
                  />
                </li>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>
                    Номер приказа окончания работы
                  </h3>
                  <input
                    type="text"
                    className={styles.Activity_info_change_inp}
                    value={dismissal_order}
                    onChange={(e) => setDismissal_order(e.target.value)}
                  />
                </li>
                <button
                  onClick={() => setEnglish(true)}
                  className={styles.change_btn_Cancel}
                >
                  <p>Добавить данные на других языках</p>
                </button>
              </ul>

              {english ? (
                <div>
                  <ul className={styles.Activity_desc}>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>By specialty</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={professional_experience}
                        onChange={(e) =>
                          setProfessional_experienceEn(e.target.value)
                        }
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        General experience
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={total_experience}
                        onChange={(e) => setTotal_experienceEn(e.target.value)}
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        In the civil service
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        onChange={(e) =>
                          setPublic_service_experienceEn(e.target.value)
                        }
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        Private structure
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={private_service_experience}
                        onChange={(e) =>
                          setPrivate_service_experienceEn(e.target.value)
                        }
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Continuous</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={continuous_experience}
                        onChange={(e) =>
                          setContinuous_experienceEn(e.target.value)
                        }
                      />
                    </li>
                  </ul>

                  <ul className={styles.Activity_desc}>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Position held</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={position}
                        onChange={(e) => setPositionEn(e.target.value)}
                      />
                    </li>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>State</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Name of company</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={organization}
                        onChange={(e) => setOrganizationEn(e.target.value)}
                      />
                    </li>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        Beginning of work
                      </h3>
                      <input
                        type="date"
                        className={styles.Activity_info_change_inp}
                        value={started}
                        onChange={(e) => setStarted(e.target.value)}
                      />
                    </li>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        Start order number
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={employment_order}
                        onChange={(e) => setEmployment_orderEn(e.target.value)}
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>End of work</h3>
                      <input
                        type="date"
                        className={styles.Activity_info_change_inp}
                        value={ended}
                        onChange={(e) => setEndedEn(e.target.value)}
                      />
                    </li>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        End of work order number
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={dismissal_order}
                        onChange={(e) => setDismissal_orderEn(e.target.value)}
                      />
                    </li>
                    <button
                      onClick={() => setKyrgyz(true)}
                      className={styles.change_btn_Cancel}
                    >
                      <p>Добавить данные на кыргызском языке</p>
                    </button>
                  </ul>
                </div>
              ) : null}

              {kyrgyz ? (
                <div>
                  <ul className={styles.Activity_desc}>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        Мамандыгы боюнча
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={professional_experience}
                        onChange={(e) =>
                          setProfessional_experienceKy(e.target.value)
                        }
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Жалпы тажрыйба</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={total_experience}
                        onChange={(e) => setTotal_experienceKy(e.target.value)}
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        Мамлекеттик кызматта
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        onChange={(e) =>
                          setPublic_service_experienceKy(e.target.value)
                        }
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Жеке структура</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={private_service_experience}
                        onChange={(e) =>
                          setPrivate_service_experienceKy(e.target.value)
                        }
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Үзгүлтүксүз</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={continuous_experience}
                        onChange={(e) =>
                          setContinuous_experienceKy(e.target.value)
                        }
                      />
                    </li>
                  </ul>

                  <ul className={styles.Activity_desc}>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Кызматта турган</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={position}
                        onChange={(e) => setPositionKy(e.target.value)}
                      />
                    </li>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Мамлекет</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Компаниянын аты</h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={organization}
                        onChange={(e) => setOrganizationKy(e.target.value)}
                      />
                    </li>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Иштин башталышы</h3>
                      <input
                        type="date"
                        className={styles.Activity_info_change_inp}
                        value={started}
                        onChange={(e) => setStartedKy(e.target.value)}
                      />
                    </li>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        Буйрутма номерин баштоо
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={employment_order}
                        onChange={(e) => setEmployment_orderKy(e.target.value)}
                      />
                    </li>

                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>Жумуштун бүтүшү</h3>
                      <input
                        type="date"
                        className={styles.Activity_info_change_inp}
                        value={ended}
                        onChange={(e) => setEndedKy(e.target.value)}
                      />
                    </li>
                    <li className={styles.Activity_list_true}>
                      <h3 className={styles.Activity_title}>
                        Жумуштун бүтүрүү буйругунун номери
                      </h3>
                      <input
                        type="text"
                        className={styles.Activity_info_change_inp}
                        value={dismissal_order}
                        onChange={(e) => setDismissal_orderKy(e.target.value)}
                      />
                    </li>
                  </ul>
                </div>
              ) : null}

              <div className={styles.change_btn}>
                <button
                  onClick={() => setChange(false)}
                  className={styles.change_btn_Cancel}
                >
                  <p>Отмена</p>
                </button>
                <button
                  onClick={handleSubmit}
                  className={styles.change_btn_save}
                >
                  <p style={{ color: 'white' }}>Сохранить Изменения</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.Activity}>
            <div className={styles.ActivityHeader}>
              <div className={styles.header_left}>
                {/* <img src={back} alt="" className={styles.header_left_img} /> */}
                <h4 className={styles.header_left_info}>
                  Трудовая деятельность/Стаж работы
                </h4>
              </div>
              <div className={styles.headerRight}>
                <img
                  src={pencil}
                  onClick={() => setChange(true)}
                  className={styles.headerRight_info}
                ></img>
              </div>
            </div>
            <ul className={styles.Activity_desc}>
              <li className={styles.Activity_list}>
                <p className={styles.Activity_title}>Специальность</p>
                <p className={styles.Activity_info}>
                  {info.employment?.professional_experience}
                </p>
              </li>

              <li className={styles.Activity_list}>
                <p className={styles.Activity_title}>Общий</p>
                <p className={styles.Activity_info}>
                  {info.employment?.total_experience}
                </p>
              </li>

              <li className={styles.Activity_list}>
                <p className={styles.Activity_title}>Гос.Служба</p>
                <p className={styles.Activity_info}>
                  {info.employment?.public_service_experience}
                </p>
              </li>

              <li className={styles.Activity_list}>
                <p className={styles.Activity_title}>Частаня структура</p>
                <p className={styles.Activity_info}>
                  {info.employment?.private_service_experience}
                </p>
              </li>
            </ul>

            <h3 className={styles.Activity_title_sec}>
              Выполняемая работа с начала трудовой деятельности
            </h3>
            {info.employment?.experiences?.map((item) => (
              <ul className={styles.Activity_desc}>
                <li className={styles.Activity_list}>
                  <p className={styles.Activity_title}>Занимаемая должность</p>
                  <p className={styles.Activity_info}>{item.position}</p>
                </li>

                <li className={styles.Activity_list}>
                  <p className={styles.Activity_title}>Штат</p>
                  <p className={styles.Activity_info}>{item.organization}</p>
                </li>

                <li className={styles.Activity_list}>
                  <p className={styles.Activity_title}>
                    Наименование организации
                  </p>
                  <p className={styles.Activity_info}>{item.organization}</p>
                </li>

                <li className={styles.Activity_list}>
                  <p className={styles.Activity_title}>Начало работы</p>
                  <p className={styles.Activity_info}>{item.started}</p>
                </li>
                <li className={styles.Activity_list}>
                  <p className={styles.Activity_title}>Конец работы</p>
                  <p className={styles.Activity_info}>{item.ended}</p>
                </li>
                <button
                  onClick={() => deleteUserInfo(item.id)}
                  className={styles.change_btn_delete}
                >
                  <img src={deleteIcon} style={{ color: 'white' }} alt="" />
                </button>
              </ul>
            ))}
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default ActivityInfo
