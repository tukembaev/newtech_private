import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useState } from 'react'
import { createMyMicroService } from 'service/TariffService'
import Notification from 'utils/Notifications'
import styles from './CustomServiceForm.module.scss'
const CustomServiceForm = ({ setMicroservice, setRender }) => {
  const { loading, withLoading } = useLoading(false)
  const [title_service, setService] = useState('')
  const [discription_service, setDiscription] = useState('')
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const handleSubmit = async () => {
    if (!title_service || !discription_service) {
      setNotify({
        isOpen: true,
        message: 'Заполните все поля',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        await withLoading(async () => {
          const response = await createMyMicroService({
            title: title_service,
            text: discription_service,
          })
          setNotify({
            isOpen: true,
            message: 'Заявка отправлена',
            type: 'success',
            sound: 'success',
          })

          await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for 2 seconds
          setRender(true)
          setMicroservice(false)
        })
      } catch (error) {
        console.log(error.response)
      }
    }
  }
  return (
    <div className={styles.container}>
      <h3>В кратце опишите какой сервис желаете получить</h3>
      <div className={styles.flex__wrap} style={{ margin: '15px 0' }}>
        <input
          id="service"
          name="service"
          className={styles.discription}
          value={title_service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Наименование сервиса"
        />
      </div>
      <div className={styles.flex__wrap}>
        <input
          id="discrip"
          name="discrip"
          className={styles.discription}
          value={discription_service}
          onChange={(e) => setDiscription(e.target.value)}
          placeholder="Краткое описание сервиса"
          maxLength={2000}
        />
      </div>
      <ButtonLoader loading={loading} position={'center'}>
        {' '}
        <button className={styles.consult_btn} onClick={handleSubmit}>
          Заказать консультацию
        </button>{' '}
      </ButtonLoader>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default CustomServiceForm
