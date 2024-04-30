import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'
import userInfo from 'utils/userInfo'
import cx from 'classnames'
import DynamicUserInfo from 'utils/DynamicUserInfo'
import bell from 'assets/icons/notification_count.png'

import home from 'assets/side_panel_icons/1home.png'
import task from 'assets/side_panel_icons/2task.png'
import personal_calendar from 'assets/side_panel_icons/3calendar.png'
import teams from 'assets/side_panel_icons/4team.png'
import docs from 'assets/side_panel_icons/5docs.png'
import order from 'assets/side_panel_icons/6order.png'
import chart from 'assets/side_panel_icons/7chart.png'
import calendar365 from 'assets/side_panel_icons/8calendar.png'
import chat from 'assets/side_panel_icons/9chat.png'
import registration from 'assets/side_panel_icons/10registration.png'
import faq from 'assets/side_panel_icons/11faq.png'
import lessonsmenu from 'assets/side_panel_icons/12lessonsmenu.png'
import concel from 'assets/side_panel_icons/0consul.png'
import academ from 'assets/side_panel_icons/2academ.png'
import disciplines from 'assets/side_panel_icons/3disc.png'
import work_plan from 'assets/side_panel_icons/4studplan.png'
import stream from 'assets/side_panel_icons/5stream.png'
import workspace from 'assets/side_panel_icons/6workspace.png'
import project from 'assets/side_panel_icons/project.png'
function Menu() {
  const user = userInfo()
  const [currentDynamicUser, getDynamic] = useState()
  const [isActive, setIsActive] = useState(false)
  const [switchToStudy, setSwitchToStudy] = useState(
    localStorage.getItem('switchToStudy') === 'true',
  )

  const handleClick = () => {
    setIsActive((current) => !current)
  }

  useEffect(() => {
    localStorage.setItem('switchToStudy', switchToStudy)
  }, [switchToStudy])

  const handleSwitchToStudy = () => {
    setSwitchToStudy((prevSwitchToStudy) => !prevSwitchToStudy)
  }

  return (
    <div className={isActive ? styles.menu__wrapper : styles.k}>
      {user.user_type === 'S' ? (
        <ul className={styles.menu__list}>
          {switchToStudy === true ? (
            <>
              <li>
                <NavLink
                  className={styles.menu__link}
                  to={`/alerts/${user.userId}`}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.menu__link} to={`/academ-calendar/`}>
                  Академический Календарь
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.menu__link} to={`/discipline/`}>
                  Мои дисциплины
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.menu__link}
                  to={`/student-discipline/`}
                >
                  Регистрация
                </NavLink>
              </li>
              <li>
                <p className={styles.menu__link} onClick={handleSwitchToStudy}>
                  Рабочая область
                </p>
              </li>{' '}
            </>
          ) : (
            <>
              <li>
                <span className={styles.dot}>
                  <img src={bell} alt="" />({currentDynamicUser?.alert_number})
                </span>
                <NavLink
                  className={styles.menu__link}
                  to={`/alerts/${user.userId}`}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.menu__link}
                  to={`/tasks/${user.userId}`}
                >
                  Задачи
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.menu__link} to={`/calendar/`}>
                  Календарь
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.menu__link}
                  to={`/statements/${user.userId}`}
                >
                  Обращения
                </NavLink>
              </li>
              {user.division === 'Канцелярия' ? (
                <NavLink className={styles.menu__link} to={`/chancellerys`}>
                  Канцелярия
                </NavLink>
              ) : (
                ''
              )}

              <li>
                <NavLink className={styles.menu__link} to={`/support`}>
                  Поддержка 24/7
                </NavLink>
              </li>

              <li>
                <p className={styles.menu__link} onClick={handleSwitchToStudy}>
                  Учебная часть
                </p>
              </li>
            </>
          )}
        </ul>
      ) : (
        // Комп

        <>
          <ul className={styles.menu__list}>
            {switchToStudy === true ? (
              <>
                <li>
                  <NavLink
                    className={styles.menu__link}
                    to={`/alerts/${user.userId}`}
                  >
                    <img src={home} alt="" />
                    <span style={{ paddingTop: '3px' }}>Главная</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles.menu__link}
                    to={`/academ-calendar/`}
                  >
                    <img src={academ} alt="" style={{ marginTop: '11px' }} />
                    <span style={{ paddingTop: '3px' }}>
                      Академический Календарь
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={`/discipline/`}>
                    <img src={disciplines} alt="" />
                    <span style={{ paddingTop: '3px' }}> Мои дисциплины</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={`/study-plan/`}>
                    <img src={work_plan} alt="" />
                    <span style={{ paddingTop: '3px' }}> РУП</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={`/flow/`}>
                    <img src={stream} alt="" />
                    <span style={{ paddingTop: '3px' }}> Потоки</span>
                  </NavLink>
                </li>
                <li>
                  <p
                    className={styles.menu__link}
                    onClick={handleSwitchToStudy}
                  >
                    <img src={workspace} alt="" />
                    <span style={{ paddingTop: '3px' }}> Рабочая область</span>
                  </p>
                </li>{' '}
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className={styles.menu__link}
                    to={`/alerts/${user.userId}`}
                  >
                    <img src={home} alt="" />

                    <span style={{ paddingTop: '3px' }}>Главная</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles.menu__link}
                    to={`/tasks/${user.userId}`}
                  >
                    <img src={task} alt="" />
                    <span style={{ paddingTop: '2px' }}> Задачи </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={`/project/`}>
                    <img src={project} alt="" />
                    <span style={{ paddingTop: '2px' }}> Проект </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={`/calendar/`}>
                    <img src={personal_calendar} alt="" />
                    <span style={{ paddingTop: '2px' }}> Календарь</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles.menu__link}
                    to={`/statements/${user.userId}`}
                  >
                    <img src={docs} alt="" />
                    <span style={{ paddingTop: '2px' }}>Обращения</span>
                  </NavLink>
                </li>
                {user.division === 'Канцелярия' ? (
                  <NavLink className={styles.menu__link} to={`/chancellerys`}>
                    {' '}
                    <img src={home} alt="" />
                    <span style={{ paddingTop: '2px' }}> Канцелярия</span>
                  </NavLink>
                ) : (
                  ''
                )}
                <li>
                  <NavLink
                    className={styles.menu__link}
                    to={`/orders/${user.userId}`}
                  >
                    {' '}
                    <img src={order} alt="" />
                    <span style={{ paddingTop: '2px' }}> Приказы</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={`/chats/`}>
                    {' '}
                    <img src={chat} alt="" />
                    <span style={{ paddingTop: '1px' }}>Мессенджер</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={`/statistic/`}>
                    {' '}
                    <img src={chart} alt="" />
                    <span style={{ paddingTop: '1px' }}>Статистика</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.menu__link} to={`/support`}>
                    {' '}
                    <img src={faq} alt="" />
                    <span style={{ paddingTop: '2px' }}>Поддержка 24/7</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles.menu__link}
                    to={`/academ-calendar/`}
                  >
                    {' '}
                    <img src={calendar365} alt="" />
                    <span style={{ paddingTop: '2px' }}> Планирование</span>
                  </NavLink>
                </li>
                {user.is_admin_of ? (
                  <li>
                    <NavLink
                      className={styles.menu__link}
                      to={`/register_person`}
                    >
                      {' '}
                      <img src={registration} alt="" />
                      <span style={{ paddingTop: '2px' }}>Регистрация</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                {/* {user.is_admin_of ? <li>
                <NavLink className={styles.menu__link} to={`/structure`}>
                  Структура
                  
                </NavLink>
              </li> : ''} */}
                <li>
                  <NavLink className={styles.menu__link} to={`/team`}>
                    {' '}
                    <img src={teams} alt="" />
                    <span style={{ paddingTop: '2px' }}>Команды</span>
                  </NavLink>
                </li>
                <li>
                  <p
                    className={styles.menu__link}
                    onClick={handleSwitchToStudy}
                  >
                    {' '}
                    <img src={lessonsmenu} alt="" />
                    <span style={{ paddingTop: '2px' }}> Учебная часть</span>
                  </p>
                </li>
              </>
            )}
          </ul>
        </>
      )}

      <div className={styles.burger} onClick={handleClick}>
        <div className={cx(styles.line, styles.line1)}></div>
        <div className={cx(styles.line, styles.line2)}></div>
        <div className={cx(styles.line, styles.line3)}></div>
      </div>

      <DynamicUserInfo getDynamic={getDynamic} />
    </div>
  )
}

export default Menu
