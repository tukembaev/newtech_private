import eurologo from 'assets/img/1200px-Logo-europass.png'
import unetLogo from 'assets/img/UNET2.png'
import politLogo from 'assets/img/kstu.png'
import { Layout } from 'components'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { getPersonalEmployee } from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import userInfo from 'utils/userInfo'

import styles from '../Europass.module.scss'
import ProfilePage from 'pages/ProfilePage/ProfilePage'

const FinalEuropassEn = () => {
  const user = userInfo()
  const info = useSelector((state) => state.personalcard.personal_info)
  const check = useSelector((state) => state.personalcard.Europass)
  const user_changes = useSelector((state) => state.personalcard.user_change)
  const [logo, setLogo] = useState(false)
  const [euro, setEuro] = useState(false)
  const [polit, setPolit] = useState(false)
  const [unet, setUnet] = useState(false)

  const navigate = useNavigate()
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Simpleraport',
  })

  let data
  const dispatch = useDispatch()
  const [render, setRender] = useState(false)
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

  return (
    <Layout>
      <div className={styles.personal_wrapper2}>
        <div className={styles.header}>
          <h3 className={styles.Personal_Card}>Personal Card</h3>
          <div className={styles.header_body}>
            <div className={styles.personal_info}>
              <ProfilePage userId={user.userId} />
            </div>
            <button
              className={styles.btn1}
              style={{ marginLeft: '25px' }}
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate('/europass')}
          style={{ width: '100px', marginRight: '30px' }}
          className={styles.btn1}
        >
          Back
        </button>

        <button
          onClick={() => {
            setLogo(true)
          }}
          className={styles.btn1}
        >
          Choose Logo
        </button>

        {logo ? (
          <div
            style={{
              marginTop: '20px',
              width: '280px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <img
              onClick={() => {
                setPolit(false)
                setEuro(true)
                setUnet(false)
              }}
              style={{ width: '40px', cursor: 'pointer' }}
              src={eurologo}
              alt=""
            />
            <img
              onClick={() => {
                setPolit(true)
                setEuro(false)
                setUnet(false)
              }}
              style={{ width: '40px', cursor: 'pointer' }}
              src={politLogo}
              alt=""
            />
            <img
              onClick={() => {
                setPolit(false)
                setEuro(false)
                setUnet(true)
              }}
              style={{ width: '30%', cursor: 'pointer' }}
              src={unetLogo}
              alt=""
            />
          </div>
        ) : null}
        <div
          className={styles.body2}
          style={{
            margin: '0 auto',
            border: 'none',
            zIndex: '5',
            maxHeight: '3500px',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'auto',
          }}
          ref={componentRef}
        >
          <div
            style={{
              paddingTop: '45px',
              justifyContent: 'center',
              display: 'flex',
              gap: '200px',
            }}
          >
            <div style={{ width: '150px' }}>
              {polit ? (
                <div
                  style={{
                    width: '150px',
                    margin: 'auto',
                    paddingInline: '50px',
                    paddingTop: '30px',
                  }}
                >
                  <img
                    style={{ zIndex: '2', objectFit: 'contain' }}
                    src={politLogo}
                    alt=""
                  />
                </div>
              ) : null}

              {euro ? (
                <img
                  style={{
                    width: '150px',
                    height: '190px',
                    zIndex: '2',
                    objectFit: 'contain',
                  }}
                  src={eurologo}
                  alt=""
                />
              ) : null}

              {unet ? (
                <img
                  style={{
                    width: '150px',
                    height: '190px',
                    zIndex: '2',
                    objectFit: 'contain',
                  }}
                  src={unetLogo}
                  alt=""
                />
              ) : null}
            </div>
            <div>
              <img
                src={user.image}
                alt=""
                style={{
                  width: '150px',
                  height: '200px',
                  zIndex: '2',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', margin: 'auto', gap: '20px' }}>
            <div className={styles.body_left} style={{ zIndex: '5', gap: '0' }}>
              {euro ? (
                <div className={styles.body_list}>
                  <h2 className={styles.body_list_left}>
                    Europass Curriculum Vitae
                  </h2>
                </div>
              ) : null}
              {polit ? (
                <div className={styles.body_list}>
                  <h2 className={styles.body_list_left}>
                    KSTU Curriculum Vitae
                  </h2>
                </div>
              ) : null}
              {unet ? (
                <div className={styles.body_list}>
                  <h2 className={styles.body_list_left}>
                    UNET Curriculum Vitae
                  </h2>
                </div>
              ) : null}
              {euro || polit || unet ? null : <h2>ㅤㅤㅤ</h2>}
              <div className={styles.body_list}>
                <h3 className={styles.body_list_left}>Personal Information</h3>
              </div>
              <div className={styles.body_info}>
                <h4 className={styles.body_list_left}>Full Name</h4>
                <p>
                  {info?.first_name} {info?.surname}
                </p>
              </div>
              <div className={styles.body_info}>
                {info?.residence_place?.street ? (
                  <h4 className={styles.body_list_left}>Address</h4>
                ) : null}

                <p>{info?.residence_place?.street}</p>
              </div>

              <div className={styles.body_info}>
                {user_changes?.numberPhone ? (
                  <h4 className={styles.body_list_left}>Mobile</h4>
                ) : null}
                {user_changes?.numberPhone ? <p>{user?.numberPhone}</p> : null}
              </div>

              <div className={styles.body_info}>
                {user_changes?.email ? (
                  <h4 className={styles.body_list_left}>Email</h4>
                ) : null}
                {user_changes?.email ? <p>{user?.email}</p> : null}
              </div>

              <div className={styles.body_info}>
                <h4 className={styles.body_list_left}>Nationality</h4>
                <p>Kyrgyz</p>
              </div>

              <div className={styles.body_info}>
                {user_changes?.data_of_birth ? (
                  <h4 className={styles.body_list_left}>Date of Birth</h4>
                ) : null}
                {user_changes?.data_of_birth ? (
                  <p>{user?.data_of_birth}</p>
                ) : null}
              </div>

              <div className={styles.body_info}>
                {check?.education ? (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>Education</h2>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>University</h4>
                      <h4>{check?.education?.institution}</h4>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Faculty</h4>
                      <h4>{check?.education?.department}</h4>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Specialty</h4>
                      <h4>{check?.education?.academic_rank}</h4>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Start of Studies
                      </h4>
                      <h4>{check?.education?.entered}</h4>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>End of Studies</h4>
                      <h4>{check?.education?.graduated}</h4>
                    </div>
                  </div>
                ) : null}
              </div>

              {!check?.ranks || check?.ranks.length === 0 ? null : (
                <div>
                  <div className={styles.body_list}>
                    <h2 className={styles.body_list_left}>Diplomatic Rank</h2>
                  </div>
                  <div className={styles.body_list}>
                    <h4 className={styles.body_list_left}>Title</h4>
                    <h4>{check?.ranks[0]?.title}</h4>
                  </div>
                  <div className={styles.body_list}>
                    <h4 className={styles.body_list_left}>Rank</h4>
                    <h4>{check?.ranks[0]?.rank}</h4>
                  </div>
                  <div className={styles.body_list}>
                    <h4 className={styles.body_list_left}>Date</h4>
                    <h4>{check?.ranks[0]?.assigned}</h4>
                  </div>
                </div>
              )}
              {/* ... (previous code) */}

              <div className={styles.body_info}>
                {check?.military_registration ? (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>
                        Military Registration
                      </h2>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Fitness for Military Service
                      </h4>
                      {check?.military_registration.is_fit ? (
                        <h4>Fitness</h4>
                      ) : (
                        <h4>Unfit</h4>
                      )}
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Military Draft Board
                      </h4>
                      <h4>{check?.military_registration?.draft_board}</h4>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Composition</h4>
                      <h4>{check?.military_registration?.composition}</h4>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Military Specialty
                      </h4>
                      <h4>{check?.military_registration?.rank}</h4>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Military Rank</h4>
                      <h4>{check?.military_registration?.specialty}</h4>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Troop Kind</h4>
                      <h4>{check?.military_registration?.troop_kind}</h4>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className={styles.body_info}>
                {check?.employment ? (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>Work Experience</h2>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Specialty</h4>
                      <h5>{info?.employment?.professional_experience}</h5>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Total</h4>
                      <h5>{info?.employment?.total_experience}</h5>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Public service</h4>

                      <h5>{info?.employment?.public_service_experience}</h5>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Private service</h4>
                      <h5>{info?.employment?.private_service_experience}</h5>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className={styles.body_info}>
                {check?.trainings.length === 0 ? null : (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>
                        Professional Development
                      </h2>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Topic</h4>
                      <h4>{check?.trainings[0]?.title}</h4>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Start Date</h4>
                      <h4>{check?.trainings[0]?.started}</h4>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>End Date</h4>
                      <h4>{check?.trainings[0]?.ended}</h4>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Type of Training
                      </h4>
                      <h4>{check?.trainings[0]?.kind}</h4>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Type of Certification
                      </h4>
                      <h4>{check?.trainings[0]?.certification_type}</h4>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.body_info}>
                {check?.employment === true &&
                check?.employment?.experiences.length ? (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>
                        Current Employment
                      </h2>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Occupied Position
                      </h4>
                      <h5>{info?.employment?.experiences[0].position}</h5>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Staff</h4>
                      <h5>{info?.employment?.experiences[0].organization}</h5>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Organization Name
                      </h4>
                      <h5>{info?.employment?.experiences[0].organization}</h5>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Start Date</h4>
                      <h5>{info?.employment?.experiences[0].started}</h5>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>End Date</h4>
                      <h5>{info?.employment?.experiences[0].ended}</h5>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FinalEuropassEn
