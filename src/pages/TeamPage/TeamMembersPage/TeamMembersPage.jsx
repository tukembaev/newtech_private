import React, { useEffect, useState } from 'react'
import styles from './TeamMembersPage.module.scss'
import { Button, Layout } from 'components'

import { useDispatch, useSelector } from 'react-redux'
// import { SendInviteToTeam, getMyTeam } from 'service/CollectiveService'
// import { setMyTeam } from 'store/slices/CollectiveSlice'
import right from 'assets/icons/chevron_right.png'
import help from 'assets/icons/help_table.svg'
import del from 'assets/icons/trash_del.svg'
import {
  SendInviteToTeam,
  deleteTeamMember,
  getTeamMember,
} from 'service/CollectiveService'
import { useNavigate, useParams } from 'react-router-dom'
import { setTeamMembers } from 'store/slices/CollectiveSlice'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import EmployeeSelectAllUserId from 'hooks/EmployeeSelect/EmployeeSelectAllUserId'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import ProfileCard from 'components/ProfileCard/ProfileCard'
const TeamMembersPage = () => {
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
      if (error.response.data.detail === 'Страница не найдена.') {
        navigate('/team')
      }
    }
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const members = useSelector((state) => state.collective.team_members)

  function createTeammatesObject(selectedEmployees) {
    const transformedMembers = selectedEmployees.map((employee) => ({
      team: members.id,
      user_id: employee.user_id,
    }))
    return transformedMembers
  }
  let team_id = createTeammatesObject(selectedEmployee)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (selectedEmployee.length === 0) {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали пользователей',
        type: 'warning',
        sound: 'warning',
      })
    } else if (
      team_id.some((teamMember) =>
        members.members.some((member) => member.value === teamMember.user_id),
      )
    ) {
      setNotify({
        isOpen: true,
        message: 'Один из пользователей уже есть в команде',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        let response = await SendInviteToTeam(team_id)

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
  const handleDeleteClick = async (id, id2) => {
    try {
      let response = await deleteTeamMember(id, id2)
      setRender(true)
      // Handle the response or state updates here
    } catch (error) {
      console.error('Error deleting team member:', error)
    }
  }

  const user = userInfo()
  const adminTeamMember = members?.members?.find(
    (member) => member.is_admin_team === true,
  )
  console.log(members)
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
          {adminTeamMember?.value === user.userId ? (
            <button onClick={() => setOpenModal(true)}>
              Добавить участника{' '}
            </button>
          ) : null}
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
                {adminTeamMember?.value === user.userId ? (
                  <th className={styles.table__item}>
                    <span className={styles.table__title}></span>
                  </th>
                ) : null}
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {/* Участники с is_confirmed: true */}
              {members?.members
                ?.filter((item) => item.is_confirmed)
                .map((item) => (
                  <>
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState) => (
                        <>
                          <tr
                            className={styles.table__row}
                            style={{ cursor: 'pointer' }}
                            {...bindTrigger(popupState)}
                          >
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
                                  objectFit: 'cover',
                                }}
                              />
                              <span
                                className={styles.table__title}
                                style={{ fontWeight: '700', minWidth: '300px' }}
                              >
                                {item.label}
                                {item.is_admin_team ? (
                                  <span className={styles.admin}>Админ</span>
                                ) : null}
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
                              <span className={styles.table__title}>
                                {item.email}
                              </span>
                            </td>
                            {adminTeamMember?.value === user.userId ? (
                              <td className={styles.table__item}>
                                <span
                                  className={styles.table__title}
                                  onClick={() =>
                                    handleDeleteClick(members.id, item.id)
                                  }
                                >
                                  <img
                                    className={styles.size}
                                    src={del}
                                    alt=""
                                  />
                                </span>
                              </td>
                            ) : null}
                          </tr>
                          <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                          >
                            <ProfileCard userId={item.value} />
                          </Popover>
                        </>
                      )}
                    </PopupState>
                  </>
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
                    {adminTeamMember?.value === user.userId ? (
                      <td className={styles.table__item}>
                        <span className={styles.table__title}></span>
                      </td>
                    ) : null}
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
        width={'95%'}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <EmployeeSelectAllUserId
            selectedEmployee={setSelectedEmployee}
            isMulti={true}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default TeamMembersPage
