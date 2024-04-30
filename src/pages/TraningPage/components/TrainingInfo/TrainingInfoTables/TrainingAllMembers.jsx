import React, { useState } from 'react'
import styles from './TrainingAllMembers.module.scss'
import { Button, Layout } from 'components'

import { useSelector } from 'react-redux'

import right from 'assets/icons/chevron_right.png'
import activate from 'assets/icons/agree.png'
import disable from 'assets/icons/close.png'
import del from 'assets/icons/trash_del.svg'

import { useNavigate, useParams } from 'react-router-dom'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import EmployeeSelectAllUserId from 'hooks/EmployeeSelect/EmployeeSelectAllUserId'
import Notification from 'utils/Notifications'
import { SendInviteToTeam } from 'service/CollectiveService'
import Dropdown from 'components/Dropdown/Dropdown'
import {
  patchStageInfo,
  patchStageInfoMember,
} from 'service/ProjectService'
import userInfo from 'utils/userInfo'

const TrainingAllMembers = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const { id } = useParams()

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [idRole, setIdRole] = useState('')
  const [role_type, setRole_type] = useState('')
  const request_type = [
    { id: 0, label: 'Ментор' },
    { id: 1, label: 'Участник' },
  ]
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const members = useSelector((state) => state.project.stageInfo)
  function createTeammatesObject(selectedEmployees) {
    const transformedMembers = selectedEmployees.map((employee) => ({
      role: role_type,
      employee: employee.user_id,
    }))
    return { members: transformedMembers }
  }
  let team_id = createTeammatesObject(selectedEmployee)
  const changeMemberStatus = async (e, id, text) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      let response = await patchStageInfoMember(id, { status: text })

      setNotify({
        isOpen: true,
        message: 'Прибыль подтверждена',
        type: 'success',
        sound: 'success',
      })

      navigate(`/stage-info/${members.id}`)
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (selectedEmployee.length === 0) {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали пользователя',
        type: 'warning',
        sound: 'warning',
      })
    } else if (
      team_id.members.some((teamMember) =>
        members.members.some(
          (member) => member.user_id === teamMember.employee,
        ),
      )
    ) {
      setNotify({
        isOpen: true,
        message: 'Один из пользователей уже есть в команде ',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        let response = await patchStageInfo(members.id, team_id)

        setNotify({
          isOpen: true,
          message: 'Участник успешно добавлен',
          type: 'success',
          sound: 'success',
        })

        setOpenModal(false)
        setSelectedEmployee([])
        navigate(`/stage-info/${members.id}`)
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
  const user = userInfo()
  const roleInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.role
  const statusInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.status

  return (
    <Layout>
      <div className={styles.team__wrapper}>
        <div className={styles.team__header}>
          <div className={styles.title}>
            <span
              onClick={() => navigate(`/flow/`)}
              style={{ cursor: 'pointer' }}
            >
              Потоки
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
              onClick={() => navigate(`/flow-info/${members.id}`)}
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
          <div>
            {' '}
            <h3>Участники этапа</h3>{' '}
            <input
              className={styles.search}
              placeholder="Поиск по сотруднику"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {roleInProject === 'Ментор' ||
          (members?.creator_name?.includes(user.surName) &&
            members.status !== 'Завершен') ? (
              <button onClick={() => setOpenModal(true)}>
                Добавить участника
              </button>
          ) : (
            ''
          )}
        </div>
        <div className={styles.team__body}>
          <table className={styles.table__wrapper}>
            <thead className={styles.table__head}>
              <tr className={styles.table__row}>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Сотрудники</span>
                </th>

                <th className={styles.table__item}>
                  <span className={styles.table__title}>Статус</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Роль</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Электронный адрес</span>
                </th>
                {roleInProject === 'HR-менеджер' &&
                statusInProject !== 'неактивен' ? (
                  <th className={styles.table__item}>
                    <span className={styles.table__title}></span>
                  </th>
                ) : (
                  ''
                )}
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {/* Участники с is_confirmed: true */}
              {members?.members
                ?.filter((item) =>
                  item?.employee_name?.toLowerCase().includes(searchTerm),
                )
                .map((item) => (
                  <tr className={styles.table__row}>
                    <td className={styles.table__item}>
                      <img
                        src={item.image}
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
                        style={{ fontWeight: '700' }}
                      >
                        {item.employee_name}
                      </span>
                    </td>

                    <td className={styles.table__item}>
                      {item.status === 'активен' ? (
                        <span
                          className={styles.table__title3}
                          style={{
                            padding: '2px 14px 2px 14px',
                            background: 'rgb(72 206 143 / 73%)',
                            color: '#158318',
                            borderRadius: '16px',
                            fontSize: '14px',
                          }}
                        >
                          Active
                        </span>
                      ) : item.status === 'удален' ? (
                        <span
                          className={styles.table__title3}
                          style={{
                            padding: '2px 14px 2px 14px',
                            background: 'rgb(246 16 58 / 64%)',
                            color: 'rgb(0 0 0);',
                            borderRadius: '16px',
                            fontSize: '14px',
                          }}
                        >
                          Removed
                        </span>
                      ) : (
                        <span
                          className={styles.table__title3}
                          style={{
                            padding: '2px 14px 2px 14px',
                            background: '#ddd',
                            color: 'black',
                            borderRadius: '16px',
                            fontSize: '14px',
                          }}
                        >
                          Incative
                        </span>
                      )}
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.role}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.email}</span>
                    </td>
                    {roleInProject === 'HR-менеджер' ? (
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.status === 'активен' ? (
                            <img
                              className={styles.size}
                              src={disable}
                              alt=""
                              onClick={(e) =>
                                changeMemberStatus(e, item.id, 'неактивен')
                              }
                            />
                          ) : (
                            <img
                              className={styles.size}
                              onClick={(e) =>
                                changeMemberStatus(e, item.id, 'активен')
                              }
                              src={activate}
                              alt=""
                            />
                          )}
                          <img
                            className={styles.size}
                            onClick={(e) =>
                              changeMemberStatus(e, item.id, 'удален')
                            }
                            src={del}
                            alt=""
                          />
                        </span>
                      </td>
                    ) : (
                      ''
                    )}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Dropdown
            setId={setIdRole}
            setType={setRole_type}
            title={'Роль'}
            data={request_type ?? []}
          />
          <EmployeeSelectAllUserId
            selectedEmployee={setSelectedEmployee}
            isMulti={true}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                setOpenModal(false)
                setSelectedEmployee([])
              }}
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

export default TrainingAllMembers
