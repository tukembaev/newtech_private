import React, { useEffect, useState } from 'react'
import styles from './CollectivePage.module.scss'
import { Button, Layout } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'

import Notification from 'utils/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { SendInviteToTeam, getMyMembers } from 'service/CollectiveService'
import { setMyMembers } from 'store/slices/CollectiveSlice'
import EmployeeSelectAllUserId from 'hooks/EmployeeSelect/EmployeeSelectAllUserId'

import { Popover } from '@mui/material'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import ProfilePage from 'pages/ProfilePage/ProfilePage'
const CollectivePage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const [idClick, setIdClick] = useState()
  const [render, setRender] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const dispatch = useDispatch()

  let team_id

  function createTeammatesObject(selectedEmployees) {
    const teammateIds = selectedEmployees?.map((employee) => employee.id)
    return {
      teammates: teammateIds,
    }
  }

  team_id = createTeammatesObject(selectedEmployee)

  let data
  const getData = async () => {
    try {
      let response = await getMyMembers(data)

      dispatch(
        setMyMembers({
          members: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const myTeam = useSelector((state) => state.collective.members)

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
      selectedEmployee.some((obj) =>
        myTeam?.confirmed?.some(
          (confirmedObj) => confirmedObj.value === obj?.user_id,
        ),
      )
    ) {
      setNotify({
        isOpen: true,
        message: 'Пользователь уже есть в составе',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        let response = await SendInviteToTeam(team_id.teammates)

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
      <div className={styles.titile__wrapper}>
        <div className={styles.title}>Мои команды</div>

        <div>
          <Button
            className="create__statement__btn"
            style={{ marginRight: '10px' }}
            onClick={() => setOpenModal(true)}
          >
            Пригласить
          </Button>
        </div>
      </div>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
              {myTeam?.confirmed.length === 0 ? (
                <h1 style={{ color: 'white' }}>
                  У вас пустой состав, добавьте пользователей для совместной
                  работы
                </h1>
              ) : (
                <>
                  {myTeam?.confirmed?.map((item, index) => {
                    return (
                      <div {...bindTrigger(popupState)}>
                        <div
                          className={styles.user_card}
                          onClick={() => setIdClick(item.value)}
                        >
                          <img
                            src={item.photo}
                            style={{
                              borderRadius: '50%',
                              width: '54px',
                              height: '54px',
                              objectFit: 'cover',
                              marginTop: '7px',
                            }}
                            alt=""
                          />
                          <h4 style={{ color: 'white', paddingTop: '20px' }}>
                            {item.label}
                          </h4>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
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
              <ProfilePage userId={idClick} />
            </Popover>
          </>
        )}
      </PopupState>
      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal}
        modalTitle={'Пригласить в Состав'}
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

export default CollectivePage
