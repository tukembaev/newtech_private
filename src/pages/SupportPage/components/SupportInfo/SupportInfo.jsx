import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Layout } from 'components'
import {
  getSupportDataById,
  updateSupportMessage,
} from 'service/SupportService'
import {
  setSupportById,
  setUpdatedSupport,
} from 'store/slices/SupportSlice'
import userInfo from 'utils/userInfo'

import styles from './SupportInfo.module.scss'
import ChatTaskItem from 'pages/TasksPage/components/TaskItem/TaskItemInfo/ChatTaskItem/ChatTaskItem'

const SupportInfo = () => {
  const [data] = useState()
  let text;
  const user = userInfo()
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await getSupportDataById(id, data)
      dispatch(
        setSupportById({
          supportId: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const updateStatus = async () => {
    let newStatus = { status: 'Рассмотрено' }

    let response = await updateSupportMessage(id, newStatus)

    dispatch(setUpdatedSupport(response.data))
  }
  const supportData = useSelector((state) => state.support.supportId)

  return (
    <Layout>
      <div className={styles.task_info_left}>
        <div className={styles.task_info_left_header}>
          <div>
            {' '}
            <h2>
              {supportData.topic} ({supportData.request_type})
            </h2>
          </div>
        </div>
        <div className={styles.task_info_left_body}>
          <p>{supportData.message}</p>
        </div>

        <div className={styles.simple_raports_footer}>
          <div className={styles.simple_raports_footer_btns}>
            <div>
              <Button className={styles.btn1} onClick={() => navigate(-1)}>
                Назад
              </Button>
            </div>
            {supportData.status === 'На рассмотрении' && user.is_admin_of ? (
              <Button
                className={styles.btn1}
                onClick={() => {
                  updateStatus((text = 'Рассмотрено'))
                }}
              >
                Завершить
              </Button>
            ) : (
              ''
            )}
          </div>
          <div>
            <ChatTaskItem globalChat={false} SupportChat={true} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SupportInfo
