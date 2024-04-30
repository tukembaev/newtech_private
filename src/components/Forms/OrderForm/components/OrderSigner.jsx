import { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styles from './OrderSignerAgreement.module.scss'
const OrderSigner = ({ text, dataSigners, setSigner }) => {
  const animatedComponents = makeAnimated()
  const [isLoading, setIsLoading] = useState(true)
  const handleSelect = (dataSigners) => {
    setSigner(dataSigners?.value)
  }
  useEffect(() => {
    if (dataSigners?.length !== 0) {
      setIsLoading(false)
    }
  }, [dataSigners])

  return (
    <div className={styles.inline}>
      <div className={styles.task_responsible}>
        <p>{text}</p>

        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={dataSigners}
          onChange={handleSelect}
          isSearchable={true}
          placeholder="Выбрать адресата"
          autosize={true}
          noOptionsMessage={() => 'Поиск не дал результатов'}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default OrderSigner
