import React, { useEffect, useState } from 'react'
import styles from './StageAllMembers.module.scss'
import { Button, Layout } from 'components'

import { useSelector } from 'react-redux'

import right from 'assets/icons/chevron_right.png'
import help from 'assets/icons/help_table.svg'
import del from 'assets/icons/trash_del.svg'

import { useNavigate, useParams } from 'react-router-dom'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import EmployeeSelectAllUserId from 'hooks/EmployeeSelect/EmployeeSelectAllUserId'
import Notification from 'utils/Notifications'
import { SendInviteToTeam } from 'service/CollectiveService'
import Dropdown from 'components/Dropdown/Dropdown'
import { patchStageInfo } from 'service/ProjectService'
import userInfo from 'utils/userInfo'
import { Slider } from '@mui/material'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import AddResources from 'components/Forms/ProjectForm/AddResources/AddResources'

const StageAllRes = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })

  const [openModal, setOpenModal] = useState(false)

  const [render, setRender] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }
  const navigate = useNavigate()

  const members = useSelector((state) => state.project.stageInfo)

  const user = userInfo()
  const roleInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.role
  const statusInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.status

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])
  useEffect(() => {
    width < 600 && handleSideNavToggle()
  })

  function handleSideNavToggle() {}
  const totalCost = members?.resources?.reduce(
    (acc, item) => acc + parseFloat(item.cost),
    0,
  )
  return (
    <Layout>
      <div className={styles.team__wrapper}>
        <div className={styles.team__header}>
          <div className={styles.title}>
            <span
              onClick={() => navigate(`/project/`)}
              style={{ cursor: 'pointer' }}
            >
              Проекты
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
            <span
              onClick={() => navigate(`/project/${members.project}`)}
              style={{ cursor: 'pointer' }}
            >
              {members.project_title}
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
            <span
              onClick={() => navigate(`/stage-info/${members.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {members.title}
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
            <span style={{ color: '#090909' }}>Ресурсы</span>
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
        <div className={styles.member_add_header}>
          <div>
            <h3>
              Общие ресурсы
              {(roleInProject === 'Бухгалтер' &&
                statusInProject !== 'неактивен') ||
              roleInProject === 'Процесс-менеджер'
                ? ` (Всего потрачено: ${totalCost})`
                : `ss`}
            </h3>
            <input
              className={styles.search}
              placeholder="Поиск по названию"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            {(roleInProject === 'Ресурс-менеджер' &&
              statusInProject !== 'неактивен') ||
            roleInProject === 'Процесс-менеджер' ||
            (members?.creator_name?.includes(user.surName) &&
              members.status !== 'Завершен' &&
              members.status.includes('Ждет выполнения с') === false) ? (
                <button onClick={() => setState({ isPaneOpen: true })}>
                  Добавить ресурс
                </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={styles.team__body}>
          <table className={styles.table__wrapper}>
            <thead className={styles.table__head}>
              <tr className={styles.table__row}>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Наименование</span>
                </th>

                <th className={styles.table__item}>
                  <span className={styles.table__title}>Дата поступления</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Общее количество</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Используется</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Остаток</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Общая стоимость</span>
                </th>
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {members?.resources
                ?.filter((item) =>
                  item.title.toLowerCase().includes(searchTerm),
                )
                .map((item) => (
                  <tr className={styles.table__row}>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.title}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.entry_date}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.in_use}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.remain}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.cost}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {width > 600 ? (
        <SlidingPaneUtil
          size="80%"
          title="Добавление ресурса"
          state={state}
          setState={setState}
        >
          <AddResources setState={setState} setNotify={setNotify} />{' '}
        </SlidingPaneUtil>
      ) : (
        <SlidingPaneUtil
          size="100%"
          title="Добавление ресурса"
          state={state}
          setState={setState}
        >
          <AddResources setState={setState} setNotify={setNotify} />{' '}
        </SlidingPaneUtil>
      )}

      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default StageAllRes
