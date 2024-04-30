import eurologo from 'assets/img/1200px-Logo-europass.png'
import unetLogo from 'assets/img/UNET2.png'
import politLogo from 'assets/img/kstu.png'
import { Layout } from 'components'
import ProfilePage from 'pages/ProfilePage/ProfilePage'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { getPersonalEmployee } from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import userInfo from 'utils/userInfo'
import styles from './Europass.module.scss'
const FinalEuropass = () => {
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

  return (
    <Layout>
      <div className={styles.personal_wrapper2}>
        <div className={styles.header}>
          <h3 className={styles.Personal_Card}>Личная Карточка</h3>
          <div className={styles.header_body}>
            <div className={styles.personal_info}>
              <ProfilePage userId={user.userId} />
            </div>
            <button
              className={styles.btn1}
              style={{ marginLeft: '25px' }}
              onClick={handlePrint}
            >
              Распечатать
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate('/europass')}
          style={{ width: '100px', marginRight: '30px' }}
          className={styles.btn1}
        >
          Назад
        </button>

        <button
          onClick={() => {
            setLogo(true)
          }}
          className={styles.btn1}
        >
          Выберите Логотип
        </button>

        {logo ? (
          <div
            style={{
              marginTop: '20px',
              width: '330px',
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
              style={{ width: '100px', cursor: 'pointer' }}
              src={eurologo}
              alt=""
            />
            <img
              onClick={() => {
                setPolit(true)
                setEuro(false)
                setUnet(false)
              }}
              style={{ width: '50px', cursor: 'pointer' }}
              src={politLogo}
              alt=""
            />
            <img
              onClick={() => {
                setPolit(false)
                setEuro(false)
                setUnet(true)
              }}
              style={{ width: '80px', cursor: 'pointer' }}
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
                  border: '1px solid #eee',
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
                <h3
                  style={{ fontSize: '22px' }}
                  className={styles.body_list_left}
                >
                  Личная информация
                </h3>
              </div>
              {/* <h3 >Личная информация</h3> */}
              <div className={styles.body_info}>
                <h4 className={styles.body_list_left}>ФИО</h4>
                <p style={{ fontSize: '16px' }}>
                  {check.first_name} {check.surname}
                </p>
              </div>

              <div className={styles.body_info}>
                {info?.residence_place?.street ? (
                  <h4 className={styles.body_list_left}>Адрес</h4>
                ) : null}
                {info?.residence_place?.street}
              </div>

              <div className={styles.body_info}>
                {user_changes?.numberPhone ? (
                  <h4 className={styles.body_list_left}>Мобильный</h4>
                ) : null}
                {user_changes?.numberPhone ? <p>{user?.numberPhone}</p> : null}
              </div>

              <div className={styles.body_info}>
                {user_changes?.email ? (
                  <h4 className={styles.body_list_left}>Почта</h4>
                ) : null}
                {user_changes?.email ? <p>{user?.email}</p> : null}
              </div>

              <div className={styles.body_info}>
                {/* {?.numberPhone ? (<h4 className={styles.body_list_left}  >Национальность</h4>) : (null)} */}
                <h4 className={styles.body_list_left}>Национальность</h4>
                <p>{info?.citizenship}</p>
              </div>

              <div className={styles.body_info}>
                {user_changes?.data_of_birth ? (
                  <h4 className={styles.body_list_left}>Дата рождения</h4>
                ) : null}
                {user_changes?.data_of_birth ? (
                  <p>{user?.data_of_birth}</p>
                ) : null}
              </div>

              <div className={styles.body_info}>
                {check?.education ? (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>Образование</h2>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>ВУЗ</h4>
                      <p>{check?.education?.institution}</p>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Факультет</h4>
                      <p>{check?.education?.department}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Специальность</h4>
                      <p>{check?.education?.academic_rank}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Начало обучения</h4>
                      <p>{check?.education?.entered}</p>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Конец обучения</h4>
                      <p>{check?.education?.graduated}</p>
                    </div>
                  </div>
                ) : null}
              </div>

              {!check?.ranks || check?.ranks.length === 0 ? null : (
                <div>
                  <div className={styles.body_list}>
                    <h2 className={styles.body_list_left}>
                      Дипломатический ранг
                    </h2>
                  </div>
                  <div className={styles.body_list}>
                    <h4 className={styles.body_list_left}>Название</h4>
                    <p>{check?.ranks[0]?.title}</p>
                  </div>
                  <div className={styles.body_list}>
                    <h4 className={styles.body_list_left}>Звание</h4>
                    <p>{check?.ranks[0]?.rank}</p>
                  </div>
                  <div className={styles.body_list}>
                    <h4 className={styles.body_list_left}>Дата</h4>
                    <p>{check?.ranks[0]?.assigned}</p>
                  </div>
                  {/* <p>Ссылка</h4> */}
                  {/* <h4  style={{marginBottom: '5px'}}>{check?.ranks[1].certification}</h4> */}
                </div>
              )}

              <div className={styles.body_info}>
                {check?.military_registration ? (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>Воинский учет</h2>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Годность к военной службе
                      </h4>
                      {check?.military_registration.is_fit ? (
                        <h4 style={{}}>Годен</h4>
                      ) : (
                        <h4 style={{}}>Негоден</h4>
                      )}
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Военкомат по месту жительства
                      </h4>
                      <p>{check?.military_registration?.draft_board}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Состав</h4>
                      <p>{check?.military_registration?.composition}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>ВУС</h4>
                      <p>{check?.military_registration?.rank}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Воинское звание</h4>
                      <p>{check?.military_registration?.specialty}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Род войск</h4>
                      <p>{check?.military_registration?.troop_kind}</p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className={styles.body_info}>
                {check?.employment ? (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>
                        Трудовая деятельность
                      </h2>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Специальность</h4>
                      <p>{info?.employment?.professional_experience}</p>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Общий</h4>
                      <p>{info?.employment?.total_experience}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Гос.Служба</h4>
                      <p>{info?.employment?.public_service_experience}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Частная структура
                      </h4>
                      <p>{info?.employment?.private_service_experience}</p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className={styles.body_info}>
                {!check?.trainings || check?.trainings.length === 0 ? null : (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>
                        Повышение Квалификации
                      </h2>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Тема</h4>
                      <p>{info?.trainings[0]?.title}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Начало</h4>
                      <p>{info?.trainings[0]?.started}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Конец</h4>
                      <p>{info?.trainings[0]?.ended}</p>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Вид повышения</h4>
                      <p>{info?.trainings[0]?.kind}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Вид документа</h4>
                      <p>{info?.trainings[0]?.certification_type}</p>

                      {/* <div className={styles.body_list}>
                <p>Документ</h4>
               <h4  style={{marginBottom: '5px'}}>{check?.trainings[10].certification}</h4>
                
                </div> */}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.body_info}>
                {check?.employment === true &&
                check?.employment?.experiences.length !== 0 ? (
                  <div>
                    <div className={styles.body_list}>
                      <h2 className={styles.body_list_left}>
                        Выполняемая работа
                      </h2>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Занимаемая должность
                      </h4>
                      <p>{info?.employment?.experiences[0].position}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Штат</h4>
                      <p>{info?.employment?.experiences[0].organization}</p>
                    </div>
                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>
                        Наименование организации
                      </h4>
                      <p>{info?.employment?.experiences[0].organization}</p>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Начало работы</h4>
                      <p>{info?.employment?.experiences[0].started}</p>
                    </div>

                    <div className={styles.body_list}>
                      <h4 className={styles.body_list_left}>Конец работы</h4>
                      <p>{info?.employment?.experiences[0].ended}</p>
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

export default FinalEuropass
