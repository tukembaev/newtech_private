import React, { useEffect, useState } from 'react'
import styles from './NewsCard.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getNewsData } from 'service/AlertService.js'
import { setNews } from 'store/slices/AlertSlice'
import { useParams } from 'react-router-dom'
import { Button } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import useSWR from 'swr'

const NewsCard = () => {
  const [openModal, setOpenModal] = useState(false)

  const [info_card, setInfo_card] = useState([])

  const [data, setData] = useState([])

  const dispatch = useDispatch()

  const {
    data: response,
    error,
    isValidating: isLoading,
  } = useSWR('/api/news/', getNewsData)
  useEffect(() => {
    if (response) {
      dispatch(
        setNews({
          news: response.data,
        }),
      )
    } else if (error) {
      console.log(console.log(error.data))
    }
  }, [response, dispatch])

  // const getData = async () => {
  //   try {
  //     let response = await getNewsData(id, data);
  //     console.log(response)

  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  const news = useSelector((state) => state.alert.news)
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

  const handleClick = (item) => {
    setOpenModal(true)
    setInfo_card(item)
  }
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec commodo ligula Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec commodo ligula Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec commodo ligula'
  const maxWords = 9
  const limitWords = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: maxWords,
  }

  return (
    <div className={styles.news_card_wrapper}>
      {[...news].map((item) => {
        return (
          <div className={styles.news_card} onClick={() => handleClick(item)}>
            <div>
              <p className={styles.title_news}>{item.title}</p>
              <p style={limitWords}>{item.description}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p className={styles.date_footer}>
                {' '}
                {item.employee_name} <br /> {item.date_publication}
              </p>
            </div>
          </div>
        )
      })}

      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalText={info_card.title}
        width={'unset'}
      >
        <>
          <h4 style={{ paddingTop: '6px' }}>{info_card.description}</h4>

          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: '12px',
                paddingTop: '6px',
                paddingBottom: '6px',
              }}
            >
              {' '}
              {info_card.date_publication}
            </p>
          </div>

          <Button
            onClick={() => setOpenModal(false)}
            className={styles.btn_pin_close}
          >
            {' '}
            Закрыть
          </Button>
        </>
      </ModalWindow>
    </div>
  )
}

export default NewsCard
