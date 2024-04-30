import { Button } from 'components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    createCommentTask,
    getEmployee,
} from 'service/TaskService'
import {
    setCommentTask,
    setEmployee,
} from 'store/slices/TaskSlice'
import Notification from 'utils/Notifications'
import styles from './CommentsForm.module.scss'
function CommentsForm({ task, setState }) {
  //UseState
  const [comment2, setComment] = useState('')
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  //Dispatch & Navigate & Params
  const dispatch = useDispatch()
  const { id } = useParams()
  //Functions
  const getData = async () => {
    try {
      let response = await getEmployee(data)

      dispatch(
        setEmployee({
          employee: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const employee = useSelector((state) => state.task)
  const data = [employee.employee]

  const handleSubmit = async (event, task) => {
    event.preventDefault()
    if (comment2 === '') {
      setNotify({
        isOpen: true,
        message: 'Введите комментарий',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      let response = await createCommentTask(id, comment2)

      dispatch(setCommentTask(response.data))
      setNotify({
        isOpen: true,
        message: 'Комментарий успешно отправлен',
        type: 'success',
        sound: 'success',
      })
      window.location.reload()
      // setTimeout(() => {
      //   window.location.reload();
      // }, 400);

      setState({ isPaneOpen: false })
    }
  }

  return (
    <div className={styles.task_wrapper}>
      <form>
        <div className={styles.task_options}>
          <div className={styles.task_heading_bot}>
            <input
              id="discrip"
              name="discrip"
              placeholder="Введите комментарий"
              className={styles.title_input}
              value={comment2}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              className={styles.btn1}
              onClick={(event) => {
                handleSubmit(event, task)
              }}
            >
              Отправить
            </Button>
          </div>
        </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default CommentsForm
