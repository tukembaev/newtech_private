import { TextareaAutosize } from '@mui/material'
import { Button } from 'components'
import Dropdown from 'components/Dropdown/Dropdown'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    createEmployeeSupport,
    getSupportTypes,
} from 'service/SupportService'
import { setSupportTypes } from 'store/slices/SupportSlice'
import Notification from 'utils/Notifications'
import styles from './SupportForm.module.scss'
const SupportForm = ({ setRender, setState }) => {
  //UseState
  const [data] = useState()
  const [id, setId] = useState(0)
  const [type, setType] = useState()
  const [request_type, setRequest_type] = useState()
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const { loading, withLoading } = useLoading(false)

  const [employee] = useState(510)
  const [file, setFile] = useState('')
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const dispatch = useDispatch()

  const getData = async () => {
    try {
      await withLoading(async () => {
        let response = await getSupportTypes(id, data)
        dispatch(
          setSupportTypes({
            supportId: response.data,
          }),
        )

        setRequest_type(response.data.application_types)
      })
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await withLoading(async () => {
        let response = await createEmployeeSupport(type, topic, message)
        setState({ isPaneOpen: false })
        setRender(true)
      })
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
    <div className={styles.statement_wrapper}>
      <div className={styles.statement_body}>
        <Dropdown
          setId={setId}
          setType={setType}
          title={'Направление обращения'}
          data={request_type ?? []}
        />

        <input
          placeholder="Название обращения:"
          className={styles.title_input}
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <TextareaAutosize
          id="text"
          name="text"
          className={styles.discription_input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Содержимое:"
        />

        <div className={styles.statement_footer}>
          <ButtonLoader loading={loading} position={'left'}>
            <Button className={styles.btn1} onClick={handleSubmit}>
              Отправить
            </Button>
          </ButtonLoader>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>{' '}
    </div>
  )
}

export default SupportForm
