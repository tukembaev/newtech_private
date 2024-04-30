import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useState } from 'react'
import { createCustomTariff } from 'service/TariffService'
import Notification from 'utils/Notifications'
import { IOSSwitch } from '../../../MuiComponents/IOSSwitch'
import styles from './CustomTariffForm.module.scss'
const CustomTariffForm = ({ setConstructor }) => {
  const { loading, withLoading } = useLoading(false)
  const [features, setFeature] = useState({
    task: false,
    project: false,
    document: false,
    calendar: false,
    chat: false,
    statistic: false,
    flow: false,
    teams: false,
    isRegister: false,
    support: false,
  })

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const handleFeatureChange = (feature) => {
    setFeature((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }))
  }
  const selectedFeatures = {}
  for (const key in features) {
    if (features[key]) {
      selectedFeatures[key] = features[key]
    }
  }

  const handleSubmit = async () => {
    try {
      await withLoading(async () => {
        const response = await createCustomTariff(selectedFeatures)
        setNotify({
          isOpen: true,
          message: 'Заявка отправлена',
          type: 'success',
          sound: 'success',
        })
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setConstructor(false)
      })
    } catch (error) {
      console.log(error.response)
      setNotify({
        isOpen: true,
        message: `${error.response.data.message}`,
        type: 'warning',
        sound: 'warning',
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          Добавьте наши микросервисы в ваш тариф для большей эффективности
        </h3>
      </div>
      <div className={styles.body}>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.task}
            onChange={() => handleFeatureChange('task')}
          />{' '}
          Задачи
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.project}
            onChange={() => handleFeatureChange('project')}
          />{' '}
          Проекты
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.document}
            onChange={() => handleFeatureChange('document')}
          />{' '}
          Документооборот
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.calendar}
            onChange={() => handleFeatureChange('calendar')}
          />{' '}
          Календарь
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.chat}
            onChange={() => handleFeatureChange('chat')}
          />{' '}
          Чат
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.statistic}
            onChange={() => handleFeatureChange('statistic')}
          />{' '}
          Статистика
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.flow}
            onChange={() => handleFeatureChange('flow')}
          />{' '}
          Обучение
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.teams}
            onChange={() => handleFeatureChange('teams')}
          />{' '}
          Команды
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.isRegister}
            onChange={() => handleFeatureChange('isRegister')}
          />{' '}
          Регистрация пользователей
        </div>
        <div className={styles.item}>
          <IOSSwitch
            checked={features.support}
            onChange={() => handleFeatureChange('support')}
          />{' '}
          Поддержка 24/7
        </div>
      </div>
      <ButtonLoader loading={loading} position={'center'}>
        <div style={{ textAlign: 'right' }}>
          <button className={styles.btn_const} onClick={handleSubmit}>
            Собрать тариф
          </button>
        </div>
      </ButtonLoader>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default CustomTariffForm
