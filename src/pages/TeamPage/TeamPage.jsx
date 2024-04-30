import { Button, Layout } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import { useEffect, useState } from 'react'
import styles from './TeamPage.module.scss'

import right from 'assets/icons/chevron_right.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  createNewTeam,
  getMyTeam
} from 'service/CollectiveService'
import { setMyTeam } from 'store/slices/CollectiveSlice'
const TeamPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const [text, setText] = useState('')
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
    const teammateIds = selectedEmployees?.map((employee) => employee.id)
    return {
      teammates: teammateIds,
    }
  }

  team_id = createTeammatesObject(selectedEmployee)

  let data
  const getData = async () => {
    try {
      let response = await getMyTeam(data)

      dispatch(
        setMyTeam({
          team: response.data,
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

  const myTeam = useSelector((state) => state.collective.team)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await createNewTeam(text)

      setNotify({
        isOpen: true,
        message: 'Команда создана',
        type: 'success',
        sound: 'success',
      })

      setRender(true)
      setOpenModal(false)
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
            <span style={{ color: '#090909' }}>Команды</span>
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
          <button onClick={() => setOpenModal(true)}>Создать команду</button>
        </div>

        <div className={styles.team__body}>
          {myTeam.map((item) => {
            return (
              <div
                className={styles.team__card}
                onClick={() => navigate(`/team/${item.id}`)}
              >
                <div className={styles.card_header}>
                  <p>{item.name_team}</p>

                  <span className={styles.count_users}>
                    {item.members.length}
                  </span>
                </div>
                <div className={styles.card_footer}>
                  <p>Создана {item.date_create}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal}
        modalTitle={'Название команды'}
        width={'unset'}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <input
                  onChange={(e) => setText(e.target.value)}
                  className={styles.discription_input}
                  placeholder="Название"
                  required
                />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button onClick={handleSubmit} className={styles.btn_pin}>
              Создать
            </Button>
          </div>
        </div>
      </ModalWindow>
    </Layout>
  )
}

export default TeamPage
