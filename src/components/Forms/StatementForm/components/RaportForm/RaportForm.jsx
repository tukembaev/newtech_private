import { useEffect, useState } from 'react'

import { TextareaAutosize } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createRaport } from 'service/StatementsService'
import { postStatement } from 'store/slices/StatementsSlice'
import Notification from 'utils/Notifications'
import styles from './RaportForm.module.scss'

import { Button } from 'components'
import Dropdown from 'components/Dropdown/Dropdown'
import OrderSigner from 'components/Forms/OrderForm/components/OrderSigner'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { getMyMembers } from 'service/CollectiveService'
import { setMyMembers } from 'store/slices/CollectiveSlice'
import userInfo from 'utils/userInfo'

function RaportForm({ setRender, setState }) {
  //UseState
  const user = userInfo()
  const request_type = [
    { id: 0, label: 'Рапорт' },
    { id: 1, label: 'Заявление' },
  ]
  const [data] = useState()
  const [signer, setSigner] = useState('')
  const { loading, withLoading } = useLoading(false)
  const [addressee, setAddressee] = useState()
  const [id, setId] = useState('')
  const [type_doc, setType_doc] = useState('')
  const [type, setType] = useState('')
  const [text, setText] = useState('')
  const [employee] = useState(510)
  const [file, setFile] = useState([])
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  //Dispatch
  const dispatch = useDispatch()
  //Const & Let

  const getData = async () => {
    try {
      let response = await getMyMembers('document',data)

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
  const confirmedEmployees = myTeam ? [myTeam.confirmed] : []
  const dataRector = [confirmedEmployees.flat().filter((item) => item.flag)]

  const onFileChange = (event) => {
    setFile(event.target.files)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()

    if (type === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали тему документа',
        type: 'warning',
        sound: 'warning',
      })
    } else if (text === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали содержимое документа',
        type: 'warning',
        sound: 'warning',
      })
    } else if (type_doc === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали тип документа',
        type: 'warning',
        sound: 'warning',
      })
    } else if (signer === user.userId) {
      setNotify({
        isOpen: true,
        message: 'Адрессат является пользователем!',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        await withLoading(async () => {
          const formData = new FormData()
          formData.append('addressee', signer)
          formData.append('type', type)
          formData.append('type_doc', type_doc)
          formData.append('text', text)
          for (let i = 0; i < file.length; i++) {
            formData.append('files', file[i])
          }
          let response = await createRaport(formData)
          dispatch(
            postStatement({
              addressee: signer,

              type: type,
              type_doc,
              text: text,
              file: file ? file.name : null,
            }),
          )

          setNotify({
            isOpen: true,
            message: 'Документ успешно отправлен',
            type: 'success',
            sound: 'success',
          })
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
    <div>
      <div className={styles.signer} style={{ width: '280px' }}>
        <Dropdown
          setId={setId}
          setType={setType_doc}
          title={'Тип документа'}
          data={request_type ?? []}
        />
      </div>
      <div className={styles.signer}>
        <OrderSigner
          text={'Кому:'}
          dataSigners={dataRector[0]}
          setSigner={setSigner}
        />
      </div>

      <TextareaAutosize
        id="type"
        name="type"
        className={styles.type_input}
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Тема:"
      />
      <TextareaAutosize
        id="text"
        name="text"
        className={styles.discription_input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Содержимое:"
      />
      <div className={styles.add_statement_file}>
        <input type="file" multiple onChange={onFileChange} />
        <span>Прикрепление файла</span>
      </div>
      <div className={styles.statement_footer}>
        <ButtonLoader color={'black'} loading={loading} position={'center'}>
          <Button className={styles.btn1} onClick={handleSubmit}>
            Отправить
          </Button>
        </ButtonLoader>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default RaportForm
