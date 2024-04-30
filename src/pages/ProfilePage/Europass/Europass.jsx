import React, { useEffect, useState } from 'react'
import styles from './Europass.module.scss'
import { Layout } from 'components'
import ProfilePage from 'pages/ProfilePage/ProfilePage'
import userInfo from 'utils/userInfo'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { render } from '@testing-library/react'
import {
  setEuropass,
  setPersonalInfo,
  setUser_change,
} from 'store/slices/PersonalCard'
import { getPersonalEmployee } from 'service/PersonalCardService'

const Europass = () => {
  const user = userInfo()
  const [render, setRender] = useState(false)

  const info = useSelector((state) => state.personalcard.personal_info)
  const navigate = useNavigate()
  let data
  const dispatch = useDispatch()
  const [email, setEmail] = useState(false)
  const [phone, setPhone] = useState(false)
  const [citizen, setCitizen] = useState(false)
  const [address, setAddress] = useState(false)
  const [birth_date, setBirth_date] = useState(false)
  const [education, setEducation] = useState(false)
  const [diplomatic, setDiplomatic] = useState(false)
  const [military, setMilitary] = useState(false)
  const [activity, setActivity] = useState(false)
  const [trainQualif, setTrainQualif] = useState(false)
  const [profession, setProfession] = useState(false)

  const getDataStart = async () => {
    try {
      let response = await getPersonalEmployee(data, 'ru')

      dispatch(
        setPersonalInfo({
          personal_info: response.data,
        }),
      )
    } catch (error) {}
  }

  useEffect(() => {
    getDataStart()

    setRender(false)
  }, [render])

  const getData = async () => {
    try {
      const check = { ...info }
      const change_user = { ...user }
      if (phone) {
        change_user.numberPhone = null
      }
      if (email) {
        change_user.email = null
      }

      if (citizen) {
        change_user.education = null
      }
      if (address) {
        info.birth_place.street = null
      }
      if (birth_date) {
        change_user.dataOfBirth = null
      }
      if (education) {
        check.education = null
      }
      if (diplomatic) {
        check.ranks = null
      }
      if (military) {
        check.military_registration = null
      }
      if (activity) {
        check.awards = null
      }
      if (trainQualif) {
        check.trainings = null
      }
      if (profession) {
        check.surname = null
      }
      dispatch(
        setEuropass({
          Europass: check,
        }),
      )
      dispatch(
        setUser_change({
          user_change: change_user,
        }),
      )
    } catch (error) {}
  }

  useEffect(() => {
    getData()
  }, [
    email,
    phone,
    citizen,
    address,
    birth_date,
    education,
    diplomatic,
    military,
    activity,
    trainQualif,
    profession,
  ])

  return (
    <Layout>
      <div className={styles.personal_wrapper}>
        <div className={styles.header}>
          <h3 className={styles.Personal_Card}>Личная Карточка</h3>
          <div className={styles.header_body}>
            <div className={styles.personal_info}>
              <ProfilePage userId={user.userId} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button className={styles.btn1} style={{}}>
                Русский{' '}
              </button>
              <button
                className={styles.btn1}
                onClick={() => navigate('/europassen')}
              >
                English
              </button>
              <button
                className={styles.btn1}
                onClick={() => navigate('/europassky')}
              >
                Кыргызча
              </button>
            </div>
          </div>
        </div>
        <button
          style={{ width: '150px', marginLeft: '30px' }}
          onClick={() => navigate('/personalcard')}
          className={styles.btn1}
        >
          Назад
        </button>

        <div className={styles.body}>
          <h3>Отметьте поля которые хотите скрыть </h3>

          <div className={styles.list}>
            <h3>Личные данные</h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setEmail(e.target.checked)}
                checked={email}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Почта</h4>
                <p>{user?.email}</p>
              </div>
              <div className={styles.item}>
                <input
                  onChange={(e) => setPhone(e.target.checked)}
                  checked={phone}
                  type="checkbox"
                  className={styles.radio}
                />
                <div>
                  <h4>Номер телефона</h4>
                  <p>{user?.numberPhone}</p>
                </div>
              </div>
              <div className={styles.item}>
                <input type="checkbox" className={styles.radio} />
                <div>
                  <h4>Гражданство</h4>
                  <p>{info?.citizenship}</p>
                </div>
              </div>
              {/* <div className={styles.item}>
              <input onChange={(e) => setAddress(e.target.checked) } checked={address} type="checkbox" className={styles.radio} />
              <div>
              <h4>Адрес проживания</h4>
              <p>{info?.birth_place?.street}</p>
              </div>
             
            </div> */}
              <div className={styles.item}>
                <input
                  onChange={(e) => setBirth_date(e.target.checked)}
                  checked={birth_date}
                  type="checkbox"
                  className={styles.radio}
                />
                <div>
                  <h4>Дата рождения</h4>
                  <p>{user?.dataOfBirth}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.list}>
            <h3>Образование</h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setEducation(e.target.checked)}
                checked={education}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>ВУЗ</h4>
                <p>{info.education?.institution}</p>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Факультет</h4>
                  <p>{info?.education?.department}</p>
                </div>
              </div>
              <div className={styles?.item}>
                <div>
                  <h4>Специальность</h4>
                  <p>{info?.education?.qualification}</p>
                </div>
              </div>
              <div className={styles?.item}>
                <div>
                  <h4>Начало обучения</h4>
                  <p>{info?.education?.entered}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Конец обучения</h4>
                  <p>{info?.education?.graduated}</p>
                </div>
              </div>
            </div>
          </div>
          {info?.ranks?.length === 0 ? null : (
            <div className={styles.list}>
              <h3>Дипломатический ранг или иные звания </h3>
              <div className={styles.item}>
                <input
                  onChange={(e) => setDiplomatic(e.target.checked)}
                  checked={diplomatic}
                  type="checkbox"
                  className={styles.radio}
                />
                <div></div>
                <div className={styles.item}>
                  <div>
                    <h4>Название</h4>
                    <p>{info?.ranks?.slice(-1)[0]?.title}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Звание</h4>
                    <p>{info?.ranks?.slice(-1)[0]?.rank}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Дата:</h4>
                    <p>{info?.ranks?.slice(-1)[0]?.assigned}.</p>
                  </div>
                </div>
                <div className={styles.item}></div>
              </div>
            </div>
          )}

          <div className={styles.list}>
            <h3>Воинский учет </h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setMilitary(e.target.checked)}
                checked={military}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Годность к военной службе</h4>
                {info?.military_registration?.is_fit ? (
                  <p>Годен</p>
                ) : (
                  <p>Не Годен</p>
                )}
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Военкомат по месту жительства</h4>
                  <p>{info?.military_registration?.draft_board}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Состав</h4>
                  <p>{info?.military_registration?.composition}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>ВУС</h4>
                  <p>{info?.military_registration?.rank}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Воинское звание</h4>
                  <p>{info?.military_registration?.specialty}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Род войск</h4>
                  <p>{info?.military_registration?.troop_kind}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.list}>
            <h3>Трудовая деятельность/Стаж работы </h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setActivity(e.target.checked)}
                checked={activity}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Специальность</h4>
                <p>{info?.employment?.professional_experience}</p>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Общий</h4>
                  <p>{info?.employment?.total_experience}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Гос.Служба</h4>
                  <p>{info?.employment?.public_service_experience}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Частная структура</h4>
                  <p>{info?.employment?.private_service_experience}</p>
                </div>
              </div>
            </div>
          </div>

          {info?.trainings?.length === 0 ? null : (
            <div className={styles.list}>
              <h3>Повышение Квалификации</h3>
              <div className={styles.item}>
                <input
                  onChange={(e) => setTrainQualif(e.target.checked)}
                  checked={trainQualif}
                  type="checkbox"
                  className={styles.radio}
                />

                <div>
                  <h4>Тема</h4>
                  <p>{info?.trainings?.slice(-1)[0]?.title}</p>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Начало</h4>
                    <p>{info?.trainings?.slice(-1)[0]?.started}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Конец</h4>
                    <p>{info?.trainings?.slice(-1)[0]?.ended}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Вид повышения</h4>
                    <p>{info?.trainings?.slice(-1)[0]?.kind}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Вид документа</h4>
                    <p>{info?.trainings?.slice(-1)[0]?.certification_type}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Документ</h4>
                    <p>{info?.trainings?.slice(-1)[0]?.certification}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {info?.employment?.experiences.length === 0 ? null : (
            <div className={styles.list}>
              <h3>Выполняемая работа с начала трудовой деятельности</h3>
              <div className={styles.item}>
                <input
                  onChange={(e) => setProfession(e.target.checked)}
                  checked={profession}
                  type="checkbox"
                  className={styles.radio}
                />
                <div>
                  <h4>Занимаемая должность</h4>
                  <p>{info?.employment?.experiences?.slice(-1)[0].position}</p>
                </div>

                <div className={styles.item}>
                  <div>
                    <h4>Штат</h4>
                    <p>
                      {info?.employment?.experiences?.slice(-1)[0].organization}
                    </p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Наименование организации</h4>
                    <p>
                      {info?.employment?.experiences?.slice(-1)[0].organization}
                    </p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Начало работы</h4>
                    <p>{info?.employment?.experiences?.slice(-1)[0].started}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Конец работы</h4>
                    <p>{info?.employment?.experiences?.slice(-1)[0].ended}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            className={styles.btn1}
            style={{ marginLeft: '25px', height: '50px' }}
            onClick={() => navigate('/finaleuro')}
          >
            Формировать Europass
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Europass
