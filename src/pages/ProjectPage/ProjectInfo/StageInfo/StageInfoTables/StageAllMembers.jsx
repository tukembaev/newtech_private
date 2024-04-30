import React, { useState } from 'react'
import styles from './StageAllMembers.module.scss'
import { Button, Layout } from 'components'
import { useSelector } from 'react-redux'
import right from 'assets/icons/chevron_right.png'
import activate from 'assets/icons/agree.png'
import disable from 'assets/icons/close.png'
import del from 'assets/icons/trash_del.svg'
import { useNavigate } from 'react-router-dom'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import EmployeeSelectAllUserId from 'hooks/EmployeeSelect/EmployeeSelectAllUserId'
import Notification from 'utils/Notifications'
import Dropdown from 'components/Dropdown/Dropdown'
import {
  patchStageInfo,
  patchStageInfoMember,
} from 'service/ProjectService'
import userInfo from 'utils/userInfo'
import pay from 'assets/icons/payments.png'
import { Slider } from '@mui/material'

const StageAllMembers = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [employeeIdSalary, setEmployeeId] = useState('')

  const [selectedEmployee, setSelectedEmployee] = useState([])
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [idRole, setIdRole] = useState('')
  const [role_type, setRole_type] = useState('')
  const request_type = [
    { id: 0, label: 'Ресурс-менеджер' },
    { id: 1, label: 'Таск-менеджер' },
    { id: 2, label: 'HR-менеджер' },
    { id: 3, label: 'Бухгалтер' },
    { id: 4, label: 'Участник' },
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

  const handleSubmitSalary = async (event) => {
    event.preventDefault()
    let budgetDouble = parseFloat(budget)
    try {
      let response = await patchStageInfo(members.id, {
        amount_for_salary: budgetDouble,
        employee: employeeIdSalary,
      })
      setNotify({
        isOpen: true,
        message: 'Зарплата успешно отправлена',
        type: 'success',
        sound: 'success',
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setOpenModal2(false)
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

  const handleInputChange = (event) => {
    setBudget(event.target.value === '' ? '' : Number(event.target.value))
  }
  const handleBlur = () => {
    if (budget < 0) {
      setBudget(0)
    } else if (budget > members?.accounting?.current_budget) {
      setBudget(members?.accounting?.current_budget)
    }
  }
  const roleInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.role
  const statusInProject = members?.members?.find((member) =>
    member?.employee_name?.includes(user.surName),
  )?.status

  const [budget, setBudget] = useState()

  const handleChangeBudget = (event, newValue) => {
    setBudget(newValue)
  }

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
          {roleInProject === 'HR-менеджер' ||
          roleInProject === 'Процесс-менеджер' ||
          (members?.creator_name?.includes(user.surName) &&
            members.status !== 'Завершен' &&
            members.status.includes('Ждет выполнения с') === false) ? (
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
                {roleInProject === 'Бухгалтер' ? (
                  <th className={styles.table__item3}>
                    <span className={styles.table__title3}></span>
                  </th>
                ) : null}
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
                    {roleInProject === 'Бухгалтер' ? (
                      <td className={styles.table__item3}>
                        <img
                          src={pay}
                          alt=""
                          className={styles.sizePay}
                          onClick={() => {
                            setOpenModal2(true)
                            setEmployeeId(item.user_id)
                          }}
                        />
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

      <ModalWindow
        setOpenModal={setOpenModal2}
        openModal={openModal2}
        modalTitle={'Фиксировать выдачу ЗП'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            className={styles.discription_input}
            value={budget}
            size="small"
            onChange={handleInputChange}
            placeholder={`Прибыль проекта : ${members.accounting?.current_budget} `}
            onBlur={handleBlur}
            type="number"
            onKeyPress={(e) => {
              // Проверка, что введенное значение является числом и не превышает 5
              if (
                isNaN(e.key) ||
                parseInt(e.target.value + e.key, 10) >
                  members.accounting?.current_budget
              ) {
                e.preventDefault()
              }
            }}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                setOpenModal2(false)
                setBudget('')
              }}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button onClick={handleSubmitSalary} className={styles.btn_pin}>
              Отправить
            </Button>
          </div>
        </div>
      </ModalWindow>

      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default StageAllMembers
