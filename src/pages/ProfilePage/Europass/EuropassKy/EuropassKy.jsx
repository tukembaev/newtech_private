import React, { useEffect, useState } from 'react'
import styles from '../Europass.module.scss'
import { Layout } from 'components'

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
import ProfilePage from 'pages/ProfilePage/ProfilePage'

const EuropassKy = () => {
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
      let response = await getPersonalEmployee(data, 'ky')

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
          <h3 className={styles.Personal_Card}>Жеке карточка</h3>
          <div className={styles.header_body}>
            <div className={styles.personal_info}>
              <ProfilePage userId={user.userId} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button
                className={styles.btn1}
                onClick={() => navigate('/europass')}
                style={{}}
              >
                Русский{' '}
              </button>
              <button
                className={styles.btn1}
                onClick={() => navigate('/europassen')}
              >
                English
              </button>
              <button className={styles.btn1}>Кыргызча</button>
            </div>
          </div>
        </div>
        <button
          style={{ width: '150px', marginBottom: '30px' }}
          onClick={() => navigate('/personalcard')}
          className={styles.btn1}
        >
          Артка
        </button>

        <div className={styles.body}>
          <h3>Жашырыла турган бөлүмдөру тандаңыз </h3>

          <div className={styles.list}>
            <h3>Жеке маалыматтар</h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setEmail(e.target.checked)}
                checked={email}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Электрондук почта</h4>
                <p>{user.email}</p>
              </div>

              <div className={styles.item}>
                <input
                  onChange={(e) => setPhone(e.target.checked)}
                  checked={phone}
                  type="checkbox"
                  className={styles.radio}
                />
                <div>
                  <h4>Телефон номери</h4>
                  <p>{user.numberPhone}</p>
                </div>

                <div className={styles.item}>
                  <input type="checkbox" className={styles.radio} />
                  <div>
                    <h4>Гражданчылык</h4>
                    <p>{info?.citizenship}</p>
                  </div>
                </div>
                {/* <div className={styles.item}>
            <input onChange={(e) => setAddress(e.target.checked) } checked={address} type="checkbox" className={styles.radio} />
            <div>
              <h4>Туугандык дарек</h4>
              <p>{info.birth_place?.street}</p>
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
                    <h4>Туулган күнү</h4>
                    <p>{user.dataOfBirth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.list}>
            <h3>Билим берүү</h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setEducation(e.target.checked)}
                checked={education}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Университет</h4>
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
                  <h4>Мамандык</h4>
                  <p>{info?.education?.qualification}</p>
                </div>
              </div>
              <div className={styles?.item}>
                <div>
                  <h4>Башталган күнү</h4>
                  <p>{info?.education?.entered}</p>
                </div>
              </div>

              <div className={styles.item}>
                <div>
                  <h4>Аяктаган күнү</h4>
                  <p>{info?.education?.graduated}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.list}>
            <h3>Дипломатиялык дөрөв жана башка тамгалар </h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setDiplomatic(e.target.checked)}
                checked={diplomatic}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                {/* <h4>Университет</h4>
              <p>КГТУ</p> */}
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Аталышы</h4>
                  <p>{info?.ranks[1]?.title}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Дөрөв</h4>
                  <p>{info?.ranks[1]?.rank}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Күнү:</h4>
                  <p>{info?.ranks[1]?.assigned}.</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Шилтеме</h4>
                  <a>{info?.ranks[1]?.certification}</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.list}>
            <h3>Аскери каттам </h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setMilitary(e.target.checked)}
                checked={military}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Жарактуу боюнча толуктуу белгилүү</h4>
                {info?.military_registration?.is_fit ? (
                  <p>Турук</p>
                ) : (
                  <p>Турук эмес</p>
                )}
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Туу жаштандык мекемеси</h4>
                  <p>{info?.military_registration?.draft_board}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Белгилүү</h4>
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
                  <h4>Аскери дөрөв</h4>
                  <p>{info?.military_registration?.specialty}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Аскери бириккен өркөк</h4>
                  <p>{info?.military_registration?.troop_kind}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.list}>
            <h3>Туулук кызмат / Тажрыйба</h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setActivity(e.target.checked)}
                checked={activity}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Мамандык</h4>
                <p>{info?.employment?.professional_experience}</p>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Жалпы</h4>
                  <p>{info?.employment?.total_experience}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Мүлкит гораздо</h4>
                  <p>{info?.employment?.public_service_experience}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Жеке топтор бириккен структура</h4>
                  <p>{info?.employment?.private_service_experience}</p>
                </div>
              </div>
            </div>
          </div>

          {info?.employment?.experiences.length === 0 ? null : (
            <div className={styles.list}>
              <h3>
                Жакында туулган иштине аракет кылгандан баштапки ишин аткаруу
              </h3>
              <div className={styles.item}>
                <input
                  onChange={(e) => setProfession(e.target.checked)}
                  checked={profession}
                  type="checkbox"
                  className={styles.radio}
                />
                <div>
                  <h4>Ишин таштаган позиция</h4>
                  <p>{info?.employment?.experiences[0].position}</p>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Аткаруучу структура</h4>
                    <p>{info?.employment?.experiences[0].organization}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Организациянын аталышы</h4>
                    <p>{info?.employment?.experiences[0].organization}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Ишке кирүү башталган убакыты</h4>
                    <p>{info?.employment?.experiences[0].started}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Иштен чыгуу убакыты</h4>
                    <p>{info?.employment?.experiences[0].ended}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            className={styles.btn1}
            style={{ marginLeft: '25px' }}
            onClick={() => navigate('/finaleuropassky')}
          >
            Европас формасы бекитүү
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default EuropassKy
