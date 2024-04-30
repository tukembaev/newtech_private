import React, { useEffect, useState } from 'react'
import styles from './StageShortMember.module.scss'
import { Button, Layout } from 'components'

import { useDispatch, useSelector } from 'react-redux'
// import { SendInviteToTeam, getMyTeam } from 'service/CollectiveService'
// import { setMyTeam } from 'store/slices/CollectiveSlice'
import right from 'assets/icons/chevron_right.png'
import help from 'assets/icons/help_table.svg'
import del from 'assets/icons/trash_del.svg'
import {
  SendInviteToTeam,
  getTeamMember,
} from 'service/CollectiveService'
import { useNavigate, useParams } from 'react-router-dom'
import { setTeamMembers } from 'store/slices/CollectiveSlice'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import EmployeeSelectAllUserId from 'hooks/EmployeeSelect/EmployeeSelectAllUserId'
import Notification from 'utils/Notifications'
const StageShortMember = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const { id } = useParams()
  const [render, setRender] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let team_id

  function createTeammatesObject(selectedEmployees) {
    const teammateIds = selectedEmployees

    return {
      teammates: teammateIds,
    }
  }

  team_id = createTeammatesObject(selectedEmployee)

  let data
  const getData = async () => {
    try {
      let response = await getTeamMember(id, data)

      dispatch(
        setTeamMembers({
          team_members: response.data,
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

  const members = useSelector((state) => state.collective.team_members)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (selectedEmployee === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали пользователя',
        type: 'warning',
        sound: 'warning',
      })
    } else if (
      members?.members?.some(
        (confirmedObj) => confirmedObj.member === selectedEmployee,
      )
    ) {
      setNotify({
        isOpen: true,
        message: 'Пользователь уже есть в команде',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        let response = await SendInviteToTeam([
          { team: members.id, user_id: selectedEmployee },
        ])

        setNotify({
          isOpen: true,
          message: 'Приглашение отправлено',
          type: 'success',
          sound: 'success',
        })

        setRender(true)
        setOpenModal(false)
        setSelectedEmployee([])
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

  return (
    <Layout>
      <div className={styles.team__wrapper}>
        <div className={styles.team__header}>
          <div className={styles.title}>
            <span onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
              {' '}
              Команды
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
            <span style={{ color: '#090909' }}>Участники</span>
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
          <h3>{members?.name_team}</h3>
          <button onClick={() => setOpenModal(true)}>
            Добавить участника{' '}
          </button>
        </div>
        <div className={styles.team__body}>
          <table className={styles.table__wrapper}>
            <thead className={styles.table__head}>
              <tr className={styles.table__row}>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Участники</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>
                    Эффективность{' '}
                    <img
                      src={help}
                      alt=""
                      title="Эффективность сотрудника есть же"
                      style={{
                        verticalAlign: 'middle',
                        cursor: 'pointer',
                        paddingLeft: '5px',
                      }}
                    />{' '}
                  </span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Позиция</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Номер</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Электронный адрес</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}></span>
                </th>
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {/* Участники с is_confirmed: true */}
              {members?.members
                ?.filter((item) => item.is_confirmed)
                .map((item) => (
                  <tr className={styles.table__row}>
                    <td className={styles.table__item}>
                      <img
                        src={item.photo}
                        alt=""
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          verticalAlign: 'middle',
                          marginRight: '15px',
                        }}
                      />
                      <span
                        className={styles.table__title}
                        style={{ fontWeight: '700' }}
                      >
                        {item.label}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span
                        className={styles.table__title}
                        style={{
                          color:
                            item.kpi < 30
                              ? '#e62020f2'
                              : item.kpi >= 30 && item.kpi <= 60
                                ? '#e6c91d'
                                : '#4A9500',
                        }}
                      >
                        {item.kpi}%
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.position}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.number_phone}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.email}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        <img className={styles.size} src={del} alt="" />
                      </span>
                    </td>
                  </tr>
                ))}
              {members?.members?.filter((item) => !item.is_confirmed).length >
                0 && (
                <div className={styles.waiting_members_title}>
                  <h3>Ожидают подтверждения</h3>
                </div>
              )}
              {/* Участники с is_confirmed: false */}
              {members?.members
                ?.filter((item) => !item.is_confirmed)
                .map((item) => (
                  <tr className={styles.table__row}>
                    <td className={styles.table__item}>
                      <img
                        src={item.photo}
                        alt=""
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          verticalAlign: 'middle',
                          marginRight: '15px',
                        }}
                      />
                      <span
                        className={styles.table__title}
                        style={{ fontWeight: '700' }}
                      >
                        {item.label}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span
                        className={styles.table__title}
                        style={{
                          color:
                            item.kpi < 30
                              ? '#e62020f2'
                              : item.kpi >= 30 && item.kpi <= 60
                                ? '#e6c91d'
                                : '#4A9500',
                        }}
                      >
                        {item.kpi}%
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.position}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}></span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}></span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}></span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal}
        modalTitle={'Пригласить в команду'}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <EmployeeSelectAllUserId
            selectedEmployee={setSelectedEmployee}
            isMulti={false}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button onClick={handleSubmit} className={styles.btn_pin}>
              Пригласить
            </Button>
          </div>
        </div>
      </ModalWindow>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default StageShortMember
