import React, { useEffect, useState } from 'react'
import { Button, Layout } from 'components/index'
import styles from './MainPage.module.scss'
import NewsCard from './components/NewsCard'
import { TextareaAutosize } from '@mui/material'
import userInfo from 'utils/userInfo'
import AlertCard from './components/AlertCard/AlertCard'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import { PostNews } from 'service/AlertService'
import { postNewNews } from 'store/slices/AlertSlice'
import Notification from 'utils/Notifications'
import { useDispatch } from 'react-redux'

function MainPage() {
  const user = userInfo()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [openModal, setOpenModal] = useState(false)
  const [title_news, setTitle_news] = useState('')
  const [discrip, setDiscrip] = useState('')

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
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (title_news === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не написали тему новости',
        type: 'warning',
        sound: 'warning',
      })
    } else if (discrip === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не написали описание новости',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        let response = await PostNews(title_news, discrip)

        dispatch(
          postNewNews({
            title: title_news,
            description: discrip,
          }),
        )

        setNotify({
          isOpen: true,
          message: 'Новость успешно опубликована',
          type: 'success',
          sound: 'success',
        })
        window.location.reload()
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
  }

  return (
    <Layout>
      <div className={styles.main_wrapper}>
        <div className={styles.news_wrapper}>
          {width > 1080 ? (
            <div style={{ display: 'flex', gap: '25px' }}>
              <h1>Новости</h1>{' '}
              {user.is_admin_of ? (
                <button
                  onClick={() => setOpenModal(true)}
                  className={styles.btn_create_news}
                >
                  Создать новость
                </button>
              ) : (
                ''
              )}{' '}
            </div>
          ) : (
            <h1>Оповещения</h1>
          )}
          {width > 1080 ? (
            <NewsCard />
          ) : (
            <>
              <AlertCard /> <h1>Новости</h1> <NewsCard />{' '}
            </>
          )}
        </div>
      </div>
      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalText={'Добавьте новость'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Заголовок новости:"
            className={styles.type_input}
            value={title_news}
            onChange={(e) => setTitle_news(e.target.value)}
          />

          <TextareaAutosize
            type="text"
            placeholder="Описание:"
            className={styles.discription_input}
            value={discrip}
            onChange={(e) => setDiscrip(e.target.value)}
            maxLength={2000}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              {' '}
              Закрыть
            </Button>
            <Button onClick={handleSubmit} className={styles.btn_send}>
              {' '}
              Отправить
            </Button>
          </div>
        </div>
      </ModalWindow>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default MainPage
