import { useEffect, useState } from 'react'
import ReactSelect from 'react-select'

const PositionSelect = ({ dataPosition, setDataPosition }) => {
  const [isLoading, setLoading] = useState(true)
  const handleSelect = (dataPosition) => {
    setDataPosition(dataPosition)
  }
  useEffect(() => {
    if (dataPosition?.length !== 0) {
      setLoading(false)
    }
  }, [dataPosition])

  return (
    <div>
      <ReactSelect
        closeMenuOnSelect={true}
        options={dataPosition}
        onChange={handleSelect}
        isSearchable={true}
        autosize={true}
        placeholder="Выбрать должность"
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default PositionSelect
