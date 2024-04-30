
import { Layout } from 'components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPersonalEmployee } from 'service/PersonalCardService'
import {
  setEuropass,
  setPersonalInfo,
  setUser_change,
} from 'store/slices/PersonalCard'
import userInfo from 'utils/userInfo'
import styles from '../Europass.module.scss'
import ProfilePage from 'pages/ProfilePage/ProfilePage'

const EuropassEn = () => {
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
      let response = await getPersonalEmployee(data, 'en')

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
          <h3 className={styles.Personal_Card}>PersonalCard</h3>
          <div className={styles.header_body}>
            <div className={styles.personal_info}>
              <ProfilePage userId={user.userId} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button
                className={styles.btn1}
                onClick={() => navigate('/europass')}
              >
                Русский{' '}
              </button>
              <button className={styles.btn1}>English</button>
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
          style={{ width: '150px', marginBottom: '30px' }}
          onClick={() => navigate('/personalcard')}
          className={styles.btn1}
        >
          Back
        </button>

        <div className={styles.body}>
          <h3>Regarding the fields to be hidden </h3>

          <div className={styles.list}>
            <h3>Personal data</h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setEmail(e.target.checked)}
                checked={email}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>email</h4>
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
                  <h4>PhoneNumber</h4>
                  <p>{user.numberPhone}</p>
                </div>
              </div>

              {/* <div className={styles.item}>
              <input onChange={(e) => setAddress(e.target.checked) } checked={address} type="checkbox" className={styles.radio} />
              <div>
              <h4>Address</h4>
              <p>{info.birth_place?.street}</p>
              </div> */}

              {/* </div> */}
              <div className={styles.item}>
                <input
                  onChange={(e) => setBirth_date(e.target.checked)}
                  checked={birth_date}
                  type="checkbox"
                  className={styles.radio}
                />
                <div>
                  <h4>Date of Birth</h4>
                  <p>{user.dataOfBirth}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.list}>
            <h3>Education</h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setEducation(e.target.checked)}
                checked={education}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>university</h4>
                <p>{info.education?.institution}</p>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>department</h4>
                  <p>{info?.education?.department}</p>
                </div>
              </div>
              <div className={styles?.item}>
                <div>
                  <h4>Speciality</h4>
                  <p>{info?.education?.qualification}</p>
                </div>
              </div>
              <div className={styles?.item}>
                <div>
                  <h4>Start date</h4>
                  <p>{info?.education?.entered}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Graduated</h4>
                  <p>{info?.education?.graduated}</p>
                </div>
              </div>
            </div>
          </div>

          {info?.ranks.length === 0 ? null : (
            <div className={styles.list}>
              <h3>Diplomatic rank or other titles </h3>
              <div className={styles.item}>
                <input
                  onChange={(e) => setDiplomatic(e.target.checked)}
                  checked={diplomatic}
                  type="checkbox"
                  className={styles.radio}
                />
                <div>
                  {/* <h4>ВУЗ</h4>
              <p>КГТУ</p> */}
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Title</h4>
                    <p>{info?.ranks[0]?.title}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Rank</h4>
                    <p>{info?.ranks[0]?.rank}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Date</h4>
                    <p>{info?.ranks[0]?.assigned}.</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Link</h4>
                    <a>{info?.ranks[0]?.certification}</a>
                    {/* <p></p> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.list}>
            <h3>Military registration </h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setMilitary(e.target.checked)}
                checked={military}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Fitness for military service</h4>
                {info?.military_registration?.is_fit ? (
                  <p>Годен</p>
                ) : (
                  <p>Не Годен</p>
                )}
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Military enlistment office at the place of residence</h4>
                  <p>{info?.military_registration?.draft_board}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Composition</h4>
                  <p>{info?.military_registration?.composition}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>VUS</h4>
                  <p>{info?.military_registration?.rank}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Military rank</h4>
                  <p>{info?.military_registration?.specialty}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Type of army</h4>
                  <p>{info?.military_registration?.troop_kind}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.list}>
            <h3>Employment / Length of service </h3>
            <div className={styles.item}>
              <input
                onChange={(e) => setActivity(e.target.checked)}
                checked={activity}
                type="checkbox"
                className={styles.radio}
              />
              <div>
                <h4>Speciality</h4>
                <p>{info?.employment?.professional_experience}</p>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Total</h4>
                  <p>{info?.employment?.total_experience}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Government Service</h4>
                  <p>{info?.employment?.public_service_experience}</p>
                </div>
              </div>
              <div className={styles.item}>
                <div>
                  <h4>Private Sector</h4>
                  <p>{info?.employment?.private_service_experience}</p>
                </div>
              </div>
            </div>
          </div>

          {info?.trainings?.length === 0 ? null : (
            <div className={styles.list}>
              <h3>Qualification Enhancement</h3>
              <div className={styles.item}>
                <input
                  onChange={(e) => setTrainQualif(e.target.checked)}
                  checked={trainQualif}
                  type="checkbox"
                  className={styles.radio}
                />

                <div>
                  <h4>Topic</h4>
                  <p>{info?.trainings[0]?.title}</p>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Start</h4>
                    <p>{info?.trainings[0]?.started}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>End</h4>
                    <p>{info?.trainings[0]?.ended}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Type of Enhancement</h4>
                    <p>{info?.trainings[0]?.kind}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Document Type</h4>
                    <p>{info?.trainings[0]?.certification_type}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Document</h4>
                    <p>{info?.trainings[0]?.certification}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {info?.employment?.experiences === 0 ? null : (
            <div className={styles.list}>
              <h3>Current Job Since the Start of Work</h3>
              <div className={styles.item}>
                <input
                  onChange={(e) => setProfession(e.target.checked)}
                  checked={profession}
                  type="checkbox"
                  className={styles.radio}
                />
                <div>
                  <h4>Occupied Position</h4>
                  <p>{info?.employment?.experiences[0].position}</p>
                </div>

                <div className={styles.item}>
                  <div>
                    <h4>Department</h4>
                    <p>{info?.employment?.experiences[0].organization}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Organization Name</h4>
                    <p>{info?.employment?.experiences[0].organization}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>Start Date</h4>
                    <p>{info?.employment?.experiences[0].started}</p>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <h4>End Date</h4>
                    <p>{info?.employment?.experiences[0].ended}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            className={styles.btn1}
            style={{ marginLeft: '25px' }}
            onClick={() => navigate('/finaleuropassen')}
          >
            Generate Europass
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default EuropassEn
