import React from 'react'
import userInfo from 'utils/userInfo'
import styles from './../ChatTaskItem.module.scss'
import { delComents } from 'service/TaskService'
import { Button } from 'components'
import bucket from 'assets/icons/delete.svg'
const handleSubmit = async (event, iddel) => {
  event.preventDefault()
  delComents(iddel, iddel)

  setTimeout(() => {
    window.location.reload()
  }, 400)
}
const Message = ({ message, SupportChat }) => {
  const user = userInfo()

  return (
    <>
      {message.employee === user.employeeId ? (
        <div className={styles.single_message_right}>
          <div className={styles.message_left_avatar}>
            <div className={styles.avatar}></div>
          </div>
          <div className={styles.message_right_wrapper}>
            <div className={styles.message_heading_right}>
              <div className={styles.flex_right}>
                <h5>
                  {message.person}{' '}
                  {SupportChat === false ? (
                    <img
                      src={bucket}
                      alt=""
                      onClick={(event) => {
                        handleSubmit(event, message.id)
                      }}
                    />
                  ) : (
                    ''
                  )}
                </h5>{' '}
              </div>
            </div>
            <div className={styles.message_body_right}>
              <p style={{ wordWrap: 'break-word' }}>{message.commentm}</p>
            </div>
            <p style={{ textAlign: 'right', fontSize: '14px' }}>
              {' '}
              {message.date_comment}{' '}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.single_message_left}>
          <div className={styles.message_left_avatar}>
            <div className={styles.avatar}></div>
          </div>
          <div className={styles.message_left_wrapper}>
            <div className={styles.message_heading_left}>
              <div className={styles.flex_left}>
                <h5>{message.person}</h5>{' '}
              </div>
            </div>
            <div className={styles.message_body}>
              <p>{message.commentm} </p>
              <p style={{ fontSize: '14px' }}>{message.date_comment}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Message
