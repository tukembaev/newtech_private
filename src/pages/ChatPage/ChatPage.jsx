import { Button, Layout } from 'components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import {
  createChat
} from 'service/ChatService'
import {
  setChats
} from 'store/slices/ChatSlice'
import DynamicUserInfo from 'utils/DynamicUserInfo'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'

import './ChatPage.scss'
import ChatContent from './components/ChatContent'

import EmployeeSelectUserId from 'hooks/EmployeeSelect/EmployeeSelectUserId'

const ChatPage = ({
  all_chats,
  setMessageCount,
  setRender,
  setId,
  setLoading,
  loading,
}) => {
  const user = userInfo()
  const navigate = useNavigate()
  const [currentDynamicUser, getDynamic] = useState()
  const [selectedChatTitle, setSelectedChatTitle] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [modalText, setModalText] = useState('Введите старый ПИН')
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [userId, setUserId] = useState()
  const [selectedEmployee, setSelectedEmployee] = useState([])
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([])
  const chan = useSelector((state) => state.chat.chats)

  const handleClick = ({ id, image, name }) => {
    setId(id)
    setSelectedChatTitle(id)
    setName(name)
    setImage(image)
    setUserId(user)
    setRender(true)
    setLoading(true)
  }

  //Вывод всех сотрудников юнет

  const handleOpen = () => {
    setOpenModal(true)
  }

  let employee_myself = user.userId
  let employee_two_post = selectedEmployee
  let check = all_chats.messagechat.filter(
    (item) => item.members[1].user_id === employee_two_post,
  )
  const createNewChat = async () => {
    try {
      if (employee_two_post === employee_myself) {
        setNotify({
          isOpen: true,
          message: '',
          type: 'warning',
          sound: 'warning',
        })
        return
      }

      if (check.length !== 0) {
        setNotify({
          isOpen: true,
          message: 'Чат уже существует',
          type: 'warning',
          sound: 'warning',
        })
        return
      }

      let response = await createChat([
        { employee: employee_two_post },
        { employee: employee_myself },
      ])

      dispatch(
        setChats({
          chats: response.data,
        }),
      )
      setRender(true)
      setOpenModal(false)
    } catch (error) {
      if (error.response.data.message === 'Чат уже существует')
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: 'warning',
          sound: 'warning',
        })
    }
  }

  const [width, setWidth] = useState(window.innerWidth)
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
  function filterMembersBySurname(data, surName) {
    const filteredMembers = []

    data.forEach((item) => {
      if (item.members && Array.isArray(item.members)) {
        item.members.forEach((member) => {
          if (member?.employee_name?.includes(surName) !== true) {
            filteredMembers.push({
              id: item.id,
              chat_type: item.chat_type,
              employee_name: member.employee_name,
              image: member.image,
              last_message: item.last_message,
              isOnline: member.is_online,
            })
          }
        })
      }
    })

    return filteredMembers
  }

  const filteredArray = filterMembersBySurname(
    all_chats.messagechat,
    user.surName,
  )

  return (
    <Layout>
      <div id="frame">
        <div id="sidepanel">
          <div id="contacts">
            <ul>
              <li class="add-contact-modify">
                <div class="wrap">
                  {width > 736 ? (
                    <h1>
                      Чаты{' '}
                      <span
                        title="Добавить чат"
                        class="plus-icon"
                        onClick={handleOpen}
                      >
                        +
                      </span>
                    </h1>
                  ) : (
                    <span class="plus-icon" onClick={handleOpen}>
                      +
                    </span>
                  )}
                </div>
              </li>
              {filteredArray?.map((item) => {
                return (
                  <li
                    class="contact"
                    onClick={() =>
                      handleClick({
                        id: item.id,
                        name: item.employee_name,
                        image: item.image,
                      })
                    }
                  >
                    <div class="wrap">
                      <span class="contact-status online"></span>
                      {/* <img src={item.image} alt=""/> */}
                      <div class="image-container">
                        <img src={item.image} alt="" />
                        {item?.isOnline ? (
                          <div class="gray-circle"></div>
                        ) : null}
                      </div>
                      <div class="meta">
                        <p class="name">{item.employee_name}</p>
                        <div class="space_between">
                          <p class="preview">
                            {item.last_message === null
                              ? 'Напишите ваше первое сообщение'
                              : item.last_message}
                          </p>
                          <p class="preview">{item.lastdate}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <Notification notify={notify} setNotify={setNotify} />

        <ChatContent
          name={name}
          image={image}
          userId={userId}
          id={selectedChatTitle}
          setId={setSelectedChatTitle}
          item={all_chats.messageId}
          setRender={setRender}
          loading={loading}
        />
        <DynamicUserInfo getDynamic={getDynamic} />
        <ModalWindow
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalTitle={'Выберите собеседника'}
          width={'unset'}
        >
          <div>
            <EmployeeSelectUserId
              selectedEmployee={setSelectedEmployee}
              setSelectedEmployeeLabel={setSelectedEmployeeLabel}
              service={'chat'}
              isMulti={false}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => setOpenModal(false)}
              className="btn_modal_close"
            >
              Закрыть
            </Button>
            <Button className="btn_modal_access" onClick={createNewChat}>
              Создать чат
            </Button>
          </div>
        </ModalWindow>
      </div>
    </Layout>
  )
}

export default ChatPage
