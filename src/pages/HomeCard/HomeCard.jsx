import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './HomeCard.module.scss'
import calendar from 'assets/gif/calendar.gif'
import document from 'assets/gif/animation_200_li8xt2um.gif'
import messenger from 'assets/gif/messenger.gif'
import statistic from 'assets/gif/statistic.gif'
import task from 'assets/gif/task.gif'
import support from 'assets/gif/support.gif'
import project from 'assets/gif/project.gif'
import indiv from 'assets/gif/indiv.gif'
import stady from 'assets/gif/stady.gif'
import update from 'assets/gif/update.gif'
import unet from 'assets/img/UNET2.png'
import whatsapp from 'assets/gif/whatsapp.json'

import { Link as ScrollLink, Element } from 'react-scroll'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import TraineeForm from 'components/Forms/TariffForm/TraineeForm/TraineeForm'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import HomeTariffPlanCard from 'components/TariffPlan/HomeTariffCards/HomeTariffCards'
import userInfo from 'utils/userInfo'
import PersonalMenuCard from '../ProfilePage/PersonalMenu/PersonalMenuCard'

const textsAndColors = [
  {
    text: 'Назначить задачу каждому сотруднику и отслеживать за статистикой.',
    color: 'orange',
  },
  {
    text: 'Вести обсуждение в рабочее время в личном мессенджере.',
    color: 'green',
  },
  {
    text: 'Автоматизировать оборот документов и их согласование.',
    color: 'blue',
  },
  {
    text: 'Тестовая версия и бесплатная консультация по кнопке ниже!',
    color: 'purple',
  },
]
const textsAndColorsEN = [
  {
    texts: 'Assign tasks to each employee and track statistics.',
    color: 'orange',
  },
  {
    texts: 'Engage in discussions during work hours in a personal messenger.',
    color: 'green',
  },
  { texts: 'Automate document circulation and approval.', color: 'blue' },
  { texts: 'Test version and free consultation below!', color: 'purple' },
]
const HomeCard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('ru') // Исходное состояние: ru
  const [data, setData] = useState()
  const [openModal, setOpenModal] = useState(false)
  const user = userInfo()
  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem('background'),
  )

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
  }
  const storedData = localStorage.getItem('subscription_title') // Получить строку из localStorage
  const logInSubTitle = JSON.parse(storedData)
  let navigate = useNavigate()
  const routeChange = () => {
    let path = `/unet`
    navigate(path)
  }
  const routeChange1 = () => {
    let path = `https://wa.me/996500404312?text=Здравствуйте!%2C%20Пишу%20вам%20по%20системе%20UNET...`
    navigate(path)
  }
  const [index, setIndex] = useState(0)
  const { text, color } = textsAndColors[index]
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % textsAndColors.length);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  const { texts, colors } = textsAndColorsEN[index]
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textsAndColorsEN.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get('https://tm.unet.kg/api/tariff/')
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.home_card_global_wrapper}>
      <div
        className={styles.ru}
        style={{ display: selectedLanguage === 'ru' ? 'block' : 'none' }}
      >
        <div className={styles.five_image}> </div>

        <div className={styles.home_card_wrapper}>
          <header className={`${styles.header} ${styles.fixed}`}>
            <div className={styles.header_inner}>
              <div className={styles.logo}>
                <img src={unet} alt="" />
              </div>
              <div className={styles.buttons}>
                <div className={styles.buttonslang}>
                  {/* <button
                    style={{
                      background: "#2155ff",
                      color: "white",
                      fontSize: "15px",
                      padding: "10px",
                      borderRadius: "6px",
                    }}
                    className={selectedLanguage === "ru" ? styles.active : ""}
                    onClick={() => handleLanguageChange("ru")}
                  >
                    RU
                  </button>
                  <button
                    style={{
                      background: "rgb(77 78 84)",
                      color: "white",
                      fontSize: "15px",
                      padding: "10px",
                      borderRadius: "6px",
                    }}
                    className={selectedLanguage === "en" ? styles.active : ""}
                    onClick={() => handleLanguageChange("en")}
                  >
                    EN
                  </button> */}
                </div>
                <Link to="https://wa.me/996500404312?text=Здравствуйте!%2C%20Пишу%20вам%20по%20системе%20UNET...">
                  <button className={styles.consultation_button2}>
                    Консультация
                  </button>
                </Link>
                {user?.userId ? (
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <>
                        <div className={styles.user__wrapper}>
                          <div
                            className={styles.avatar2}
                            {...bindTrigger(popupState)}
                          >
                            <img
                              src={user?.image}
                              alt=""
                              className={styles.image__cover}
                            />
                          </div>
                        </div>

                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          {/* <ProfilePage /> */}
                          <PersonalMenuCard
                            setBackground={setBackgroundImage}
                          />
                        </Popover>
                      </>
                    )}
                  </PopupState>
                ) : (
                  <button
                    className={styles.free_trial_button}
                    onClick={routeChange}
                  >
                    Войти
                  </button>
                )}
              </div>
            </div>
          </header>

          <section className={styles.sectionset}>
            <div className={styles.divset1}>
              <h1 className={styles.h1set}>
                Автоматизация Вашего <br></br> Рабочего Процесса
              </h1>
              <p className={styles.pset}>В системе вы можете</p>
              <div className={styles.container}>
                <h1 className={`${styles.text}`} style={{ color }}>
                  {text}
                </h1>
              </div>
              <div className={styles.buttons3}>
                <div className={styles.buttons3_in}>
                  {user?.userId ? (
                    <button
                      onClick={() => navigate(`/alerts/${user?.userId}`)}
                      className={styles.try_free_button3}
                    >
                      Перейти
                    </button>
                  ) : (
                    <button
                      onClick={routeChange}
                      className={styles.try_free_button3}
                    >
                      Войти
                    </button>
                  )}
                </div>
                <div className={styles.buttons4}>
                  <Link to="https://wa.me/996500404312?text=Здравствуйте!%2C%20Пишу%20вам%20по%20системе%20UNET...">
                    <button className={styles.consultation_button3}>
                      Получить консультацию
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.divset2}>
              <div className={styles.box}>
                <div className={styles.box_title}>
                  <h3>Компания</h3>
                  <p>Ознакомьтесь с тарифами</p>
                </div>
                <ScrollLink
                  to="tariffs"
                  smooth={true}
                  duration={500}
                  offset={-50}
                >
                  <button>Просмотреть</button>
                </ScrollLink>
              </div>
              <div className={styles.box}>
                <div className={styles.box_title}>
                  <h3>Разработчикам</h3>
                  <p>Оставьте заявку и запишитесь на стажировку</p>
                </div>
                <button onClick={() => setOpenModal(true)}>
                  Оставить заявку
                </button>
              </div>
            </div>
          </section>

          <div className={styles.five_image}>
            {' '}
            <section className={styles.section}>
              <h2>Что есть в системе?</h2>
              <div className={styles.video}>
                {/* Вставьте видео о системе здесь */}
              </div>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img
                      src={project}
                      style={{ width: '220px' }}
                      alt="Гифка 0"
                    />
                  </div>
                  <h1>Проекты</h1>
                  <p>
                    В сервисе теперь есть возможность управлять проектами. Вы
                    можете создавать проекты, разделять их по этапам, приглашать
                    участников и распределять свои ресурсы как финансовые, так и
                    материальные.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img src={stady} style={{ width: '130px' }} alt="Гифка 1" />
                  </div>
                  <h1>Обучение</h1>
                  <p>
                    Создание потоков, планирование по этапам, прикрепление
                    документов и распределение задач в новом микросервисе
                    системы UNET.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img src={task} style={{ width: '130px' }} alt="Гифка 1" />
                  </div>
                  <h1>Возможности в задачах</h1>
                  <p>
                    Наш сервис позволяет назначать задачи сотрудникам с
                    определенными сроками выполнения. Вы можете легко создавать
                    задачи, указывать сроки и отслеживать их выполнение, что
                    помогает организовать работу команды и достичь поставленных
                    целей.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img
                      src={calendar}
                      style={{ width: '130px' }}
                      alt="Гифка 2"
                    />
                  </div>
                  <h1>Календарь</h1>
                  <p>
                    Мы обеспечиваем надежную конфиденциальность в нашей системе,
                    чтобы защитить ваши данные. Мы также предоставляем анонимный
                    чат, чтобы обеспечить безопасную и защищенную коммуникацию.
                    Кроме того, наша платформа имеет плавную архитектуру,
                    обеспечивающую стабильное и эффективное функционирование.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img
                      src={document}
                      style={{ width: '130px' }}
                      alt="Гифка 3"
                    />
                  </div>
                  <h1>Обращения и документооборот</h1>
                  <p>
                    Наш сервис предоставляет возможность удобно обрабатывать и
                    хранить документы. Вы можете загружать, организовывать и
                    искать документы в одном месте, что облегчает и ускоряет
                    работу с ними.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img
                      src={messenger}
                      style={{ width: '150px' }}
                      alt="Гифка 4"
                    />
                  </div>
                  <h1>Мессенджер</h1>
                  <p>
                    Наш мессенджер предоставляет удобное средство коммуникации и
                    сотрудничества внутри организации. Вы сможете обмениваться
                    сообщениями и поддерживать эффективное взаимодействие с
                    коллегами.
                  </p>
                </div>
                <div
                  className={styles.card}
                  style={{ width: 'calc(25% - -880px)' }}
                >
                  <div className={styles.gif}>
                    <img
                      src={statistic}
                      style={{ width: '150px' }}
                      alt="Гифка 5"
                    />
                  </div>
                  <h1>Статистика и эффективность</h1>
                  <p>
                    Мы предоставляем возможность отслеживать статистику,
                    связанную с эффективностью работы, уровнем удовлетворенности
                    сотрудников и последними действиями на сайте. Это позволяет
                    анализировать производительность, выявлять тренды и
                    принимать обоснованные решения для улучшения работы
                    организации.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className={styles.four_image}>
            <section className={styles.section}>
              <div className={styles.left}>
                <h2>Что Вы получите при сотрудничестве?</h2>
              </div>
              <div className={styles.right}>
                <div className={styles.card2}>
                  <div className={styles.icon}>
                    {' '}
                    <img
                      src={update}
                      style={{ maxWidth: '150px' }}
                      alt="Гифка 5"
                    />
                  </div>
                  <h3>Регулярные обновления</h3>
                  <p>
                    Мы постоянно работаем над внедрением инноваций, чтобы
                    обеспечить вас современными и эффективными функциями.
                  </p>
                </div>
                <div className={styles.card2}>
                  <div className={styles.icon}>
                    {' '}
                    <img
                      src={indiv}
                      style={{ maxWidth: '150px' }}
                      alt="Гифка 5"
                    />
                  </div>
                  <h3>Индивидуальный подход</h3>
                  <p>
                    Разработаем и настроим специфическую логику, полностью
                    соответствующую потребностям вашей компании
                  </p>
                </div>
                <div className={styles.card2}>
                  <div className={styles.icon}>
                    {' '}
                    <img
                      src={support}
                      style={{ width: '200px' }}
                      alt="Гифка 5"
                    />{' '}
                  </div>
                  <h3>Поддержка 24/7</h3>
                  <p>
                    Наши операторы всегда готовы помочь и ответить на ваши
                    вопросы или решить возникшие трудности.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className={styles.five_image}>
            <section className={styles.section}>
              <div className={styles.left} id="tariffs">
                <h2>Тарифные планы</h2>
              </div>
              <div className={styles.right}>
                {data?.length !== 0 ? (
                  <div className={styles.tarrif_parent_wrapper}>
                    <div className={styles.tariff_parent}>
                      {data?.length === 0
                        ? []
                        : data?.corporate.map((item) => (
                            // eslint-disable-next-line react/jsx-indent
                            <HomeTariffPlanCard
                              logInSubTitle={logInSubTitle}
                              id={item?.id}
                              title={item?.title}
                              text={item?.text}
                              price={item?.price}
                              price_dollar={item?.price_dollar}
                              color={item?.color}
                              hdd_memory={item?.hdd_memory}
                              ram_memory={item?.ram_memory}
                              icon={item?.icon}
                              count_users={item?.count_users}
                              storage={item?.icon}
                              features={item?.features}
                            />
                          ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          </div>

          <div className={styles.four_image}>
            <section className={styles.section}>
              {/* Здесь разместите содержимое пятой секции */}
              <div className={styles.card2} style={{ width: 'unset' }}>
                <h2>Кто мы?</h2>
                <p>
                  Мы — команда опытных разработчиков, специализирующихся на
                  создании микросервисов и полнофункциональной системы для
                  документооборота. Наша система включает согласование, систему
                  задач, личный чат и обеспечивает 24/7 поддержку.
                </p>
                <p>
                  Мы предлагаем широкий спектр функциональных возможностей для
                  упрощения управления документами в вашей компании. Наш модуль
                  согласования документов позволяет создавать, отправлять и
                  отслеживать документы на различных этапах согласования.
                  Система задач помогает организовывать и управлять задачами,
                  устанавливать сроки, отслеживать прогресс и назначать
                  ответственных. Личный чат обеспечивает эффективную
                  коммуникацию между участниками проекта.
                </p>
                <p>
                  Мы гарантируем высокое качество разработки и безопасность
                  вашей системы. Мы следуем передовым стандартам безопасности,
                  проводим тщательное тестирование для обеспечения стабильности
                  и надежности системы.
                </p>
                <p>
                  Наши услуги включают полное обучение и поддержку при
                  использовании системы. Мы проводим обучающие сессии и
                  предоставляем документацию, чтобы вы и ваша команда могли
                  быстро освоить все функции и возможности.
                </p>
                <p>
                  Мы стремимся к долгосрочным партнерским отношениям, готовы
                  поддерживать и развивать вашу систему в соответствии с вашими
                  потребностями. Будем надежными партнерами, предоставляя вам
                  инновационные решения и постоянную поддержку.
                </p>
                <div className={styles.bottom}>
                  {user?.userId ? (
                    <button
                      onClick={() => navigate(`/alerts/${user?.userId}`)}
                      className={styles.try_free_button3}
                    >
                      Перейти
                    </button>
                  ) : (
                    <button
                      onClick={routeChange}
                      className={styles.try_free_button3}
                    >
                      Войти
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
          <div className={styles.whatsapp_icon}>
            <a href="https://wa.me/996500404312?text=Здравствуйте!%2C%20Пишу%20вам%20по%20системе%20UNET...">
              WHATSAPP
            </a>
          </div>
          <footer className={`${styles.footer} ${styles.fixed}`}>
            <div className={styles.footer_block}>
              <div className={styles.footer_left}>
                <div className={styles.footer_leftset}>
                  <h2 style={{ color: 'white' }}>Заинтересовала система?</h2>
                  <h2 style={{ color: 'white' }}>У вас остались вопросы?</h2>
                </div>
              </div>
              <div className={styles.footer_right}>
                <Link to="https://wa.me/996500404312?text=Здравствуйте!%2C%20Пишу%20вам%20по%20системе%20UNET...">
                  <button className={styles.consultation_button}>
                    Получить бесплатную консультацию
                  </button>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div
        className={styles.en}
        style={{ display: selectedLanguage === 'en' ? 'block' : 'none' }}
      >
        <div className={styles.five_image}> </div>

        <div className={styles.home_card_wrapper}>
          <header className={`${styles.header} ${styles.fixed}`}>
            <div className={styles.header_inner}>
              <div className={styles.logo}>
                <img src={unet} alt="" />
              </div>
              <div className={styles.buttons}>
                <div className={styles.buttonslang}>
                  <button
                    style={{
                      background: 'rgb(77 78 84)',
                      color: 'white',
                      fontSize: '15px',
                      padding: '10px',
                      borderRadius: '6px',
                    }}
                    className={selectedLanguage === 'ru' ? styles.active : ''}
                    onClick={() => handleLanguageChange('ru')}
                  >
                    RU
                  </button>
                  <button
                    style={{
                      background: '#2155ff',
                      color: 'white',
                      fontSize: '15px',
                      padding: '10px',
                      borderRadius: '6px',
                    }}
                    className={selectedLanguage === 'en' ? styles.active : ''}
                    onClick={() => handleLanguageChange('en')}
                  >
                    EN
                  </button>
                </div>
                <Link to="https://wa.me/996500404312?text=Hello!%2C%20I'm%20writing%20to%20you%20about%20the%20UNET%20system...">
                  <button className={styles.consultation_button2}>
                    Consultation
                  </button>
                </Link>
                <button
                  className={styles.free_trial_button}
                  onClick={routeChange}
                >
                  Sign In
                </button>
              </div>
            </div>
          </header>

          <section className={styles.sectionset}>
            <div className={styles.divset1}>
              <h1 className={styles.h1set}>
                Automation of Your <br></br> Work Process
              </h1>
              <p className={styles.pset}>In the system, you can</p>
              <div className={styles.container}>
                <h1 className={`${styles.text}`} style={{ color }}>
                  {texts}
                </h1>
              </div>
              <div className={styles.buttons3}>
                <div className={styles.buttons3_in}>
                  <button
                    onClick={routeChange}
                    className={styles.try_free_button3}
                  >
                    Sign In
                  </button>
                </div>
                <div className={styles.buttons4}>
                  <Link to="https://wa.me/996500404312?text=Hello!%2C%20I'm%20writing%20to%20you%20about%20the%20UNET%20system...">
                    <button className={styles.consultation_button3}>
                      Get Consultation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.divset2}>
              <div className={styles.box1}>
                <h3>Компания</h3>
                <p>Ознакомьтесь с тарифами</p>
                <button>Просмотреть</button>
              </div>
              <div className={styles.box2}>
                <h3>Разработчикам</h3>
                <p>Оставьте заявку и запишитесь на стажировку</p>
                <button>Оставить заявку</button>
              </div>
            </div>
          </section>

          <div className={styles.five_image}>
            {' '}
            <section className={styles.section}>
              <h2>What's in the System?</h2>
              <div className={styles.video}>
                {/* Insert video about the system here */}
              </div>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img src={project} style={{ width: '220px' }} alt="GIF 0" />
                  </div>
                  <h1>Projects</h1>
                  <p>
                    The service now allows you to manage projects. You can
                    create projects, divide them into stages, invite
                    participants, and allocate your resources, both financial
                    and material.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img src={stady} style={{ width: '130px' }} alt="GIF 1" />
                  </div>
                  <h1>Training</h1>
                  <p>
                    Create streams, plan in stages, attach documents, and
                    distribute tasks in the new UNET microservice.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img src={task} style={{ width: '130px' }} alt="GIF 1" />
                  </div>
                  <h1>Task Capabilities</h1>
                  <p>
                    Our service allows you to assign tasks to employees with
                    specific deadlines. You can easily create tasks, set
                    deadlines, and track their completion, helping to organize
                    team work and achieve goals.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img
                      src={calendar}
                      style={{ width: '130px' }}
                      alt="GIF 2"
                    />
                  </div>
                  <h1>Calendar</h1>
                  <p>
                    We ensure reliable confidentiality in our system to protect
                    your data. We also provide an anonymous chat to ensure safe
                    and secure communication. In addition, our platform has a
                    smooth architecture, ensuring stable and efficient
                    operation.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img
                      src={document}
                      style={{ width: '130px' }}
                      alt="GIF 3"
                    />
                  </div>
                  <h1>Requests and Document Flow</h1>
                  <p>
                    Our service provides the ability to conveniently process and
                    store documents. You can upload, organize, and search for
                    documents in one place, making it easier and faster to work
                    with them.
                  </p>
                </div>
                <div className={styles.card}>
                  <div className={styles.gif}>
                    <img
                      src={messenger}
                      style={{ width: '150px' }}
                      alt="GIF 4"
                    />
                  </div>
                  <h1>Messenger</h1>
                  <p>
                    Our messenger provides a convenient means of communication
                    and collaboration within the organization. You'll be able to
                    exchange messages and maintain effective interaction with
                    colleagues.
                  </p>
                </div>
                <div
                  className={styles.card}
                  style={{ width: 'calc(25% - -880px)' }}
                >
                  <div className={styles.gif}>
                    <img
                      src={statistic}
                      style={{ width: '150px' }}
                      alt="GIF 5"
                    />
                  </div>
                  <h1>Statistics and Efficiency</h1>
                  <p>
                    We provide the ability to track statistics related to work
                    efficiency, employee satisfaction levels, and recent actions
                    on the site. This allows for performance analysis, trend
                    identification, and informed decision-making to improve
                    organizational performance.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className={styles.four_image}>
            <section className={styles.section}>
              <div className={styles.left}>
                <h2>What Will You Get with Collaboration?</h2>
              </div>
              <div className={styles.right}>
                <div className={styles.card2}>
                  <div className={styles.icon}>
                    {' '}
                    <img
                      src={update}
                      style={{ maxWidth: '150px' }}
                      alt="GIF 5"
                    />
                  </div>
                  <h3>Regular Updates</h3>
                  <p>
                    We constantly work on implementing innovations to provide
                    you with modern and effective features.
                  </p>
                </div>
                <div className={styles.card2}>
                  <div className={styles.icon}>
                    {' '}
                    <img
                      src={indiv}
                      style={{ maxWidth: '150px' }}
                      alt="GIF 5"
                    />
                  </div>
                  <h3>Individual Approach</h3>
                  <p>
                    We'll develop and customize specific logic that fully aligns
                    with your company's needs.
                  </p>
                </div>
                <div className={styles.card2}>
                  <div className={styles.icon}>
                    {' '}
                    <img
                      src={support}
                      style={{ width: '200px' }}
                      alt="GIF 5"
                    />{' '}
                  </div>
                  <h3>24/7 Support</h3>
                  <p>
                    Our operators are always ready to assist and answer your
                    questions or resolve any issues that arise.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className={styles.five_image}>
            <section className={styles.section}>
              {/* Place content for the fifth section here */}
              <div className={styles.card2} style={{ width: 'unset' }}>
                <h2>Who Are We?</h2>
                <p>
                  We are a team of experienced developers specializing in
                  creating microservices and a full-featured document workflow
                  system. Our system includes approval processes, task systems,
                  private chat, and provides 24/7 support.
                </p>
                <p>
                  We offer a wide range of functional capabilities to simplify
                  document management in your company. Our document approval
                  module allows you to create, send, and track documents at
                  various approval stages. The task system helps organize and
                  manage tasks, set deadlines, track progress, and assign
                  responsibilities. The private chat ensures effective
                  communication among project participants.
                </p>
                <p>
                  We guarantee high-quality development and the security of your
                  system. We adhere to advanced security standards, conduct
                  rigorous testing to ensure the stability and reliability of
                  the system.
                </p>
                <p>
                  Our services include comprehensive training and support for
                  using the system. We conduct training sessions and provide
                  documentation to help you and your team quickly learn all the
                  features and capabilities.
                </p>
                <p>
                  We aim for long-term partnerships, ready to support and
                  develop your system according to your needs. We'll be reliable
                  partners, providing you with innovative solutions and ongoing
                  support.
                </p>
                <div className={styles.bottom}>
                  <button
                    onClick={routeChange}
                    className={styles.try_free_button}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className={styles.whatsapp_icon}>
            <a href="https://wa.me/996500404312?text=Hello!%2C%20I'm%20writing%20to%20you%20about%20the%20UNET%20system...">
              WHATASPP
              {/* <Lottie
                options={{
                  animationData: whatsapp,
                  loop: true,
                }}
                width={80}
                height={80}
              /> */}
            </a>
          </div>
          <footer className={`${styles.footer} ${styles.fixed}`}>
            <div className={styles.footer_block}>
              <div className={styles.footer_left}>
                <div className={styles.footer_leftset}>
                  <h2 style={{ color: 'white' }}>Interested in the system?</h2>
                  <h2 style={{ color: 'white' }}>Have questions?</h2>
                </div>
              </div>
              <div className={styles.footer_right}>
                <Link to="https://wa.me/996500404312?text=Hello!%2C%20I'm%20writing%20to%20you%20about%20the%20UNET%20system...">
                  <button className={styles.consultation_button}>
                    Get Free Consultation
                  </button>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={'Ждем ваших заявок'}
      >
        <TraineeForm setOpenModal={setOpenModal} />
      </ModalWindow>
    </div>
  )
}

export default HomeCard
