import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import close from 'assets/icons/close.png'
import { getImages, postImages } from 'service/BackgroundService'
import Notification from 'utils/Notifications'
import styles from './ChangeBackground.module.scss'

export default function ChangeBackground({ setOpenModal }) {
  // states
  let info
  const [data, setData] = useState([])
  const [id, setId] = useState(null)
  const dispatch = useDispatch()
  // const [render , setRender] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  // functions
  // get
  const getData = async () => {
    try {
      let response = await getImages(data)
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // post
  const handleSubmit = async () => {
    if (id !== null) {
      try {
        let response = await postImages({
          file_id: id,
        })
        localStorage.setItem('background', response.data?.file)
        setOpenModal(false)
      } catch (error) {
        console.log(error.response)
      }
    } else {
      setNotify({
        isOpen: true,
        message: 'Выберите картинку',
        type: 'warning',
        sound: 'warning',
      })
    }
  }

  return (
    <div className={styles.background_wrapper}>
      <div className={styles.background_header}>
        <p>Темы оформление</p>
        <button
          className={styles.close_img}
          onClick={() => setOpenModal(false)}
        >
          <img src={close} alt="" />
        </button>
      </div>
      <div className={styles.background_body}>
        {data?.map((item) => (
          <div
            key={item?.id}
            className={`${
              id === item?.id
                ? styles.background_child_active
                : styles.background_child
            }`}
            onClick={() => setId(item?.id)}
          >
            <img src={item?.file} alt="" className={styles.background_img} />
          </div>
        ))}
      </div>
      <div className={styles.background_footer}>
        <button className={styles.save_btn} onClick={() => handleSubmit()}>
          Сохранить
        </button>
        <button className={styles.cancel} onClick={() => setOpenModal(false)}>
          Отменить
        </button>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}
