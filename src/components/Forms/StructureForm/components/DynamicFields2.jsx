import add from 'assets/icons/plus.svg'
import Dropdown from 'components/Dropdown/Dropdown'
import { useEffect, useState } from 'react'
import styles from './../StructureForm.module.scss'

import DynamicFields3 from './DynamicFields3'

const DynamicFields2 = ({
  component,
  onValueChange,
  handleAddComponent,
  type,
  request_type,
  title,
}) => {
  const [value, setValue] = useState('')
  const [id, setId] = useState('')
  const [type3, setType3] = useState('')
  const [dynamicInput3, setDynamicInput3] = useState([])

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(event.target.value)
    onValueChange(component.id, newValue, dynamicInput3)
  }

  const handleAddComponent2 = () => {
    setDynamicInput3((prevComponents) => [
      ...prevComponents,
      { id: Date.now(), title: '' },
    ])
  }

  const handleValueChange = (id, newValue) => {
    setDynamicInput3((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === id) {
          return { ...component, title: newValue }
        }
        return component
      }),
    )
  }

  if (type === 'Отдел') {
    request_type = [{ id: 0, label: 'Сектор' }]
  }

  useEffect(() => {
    onValueChange(component.id, value, dynamicInput3)
  }, [dynamicInput3])
  return (
    <div className={styles.card_field}>
      <div style={{ display: 'flex' }}>
        <input
          className={styles.title}
          placeholder={`${type} - ${title}`}
          type="text"
          value={component.value}
          onChange={handleChange}
        />
        <div
          style={{
            display: 'flex',
            width: '24px',
            paddingBottom: '11px',
            marginLeft: '10px',
          }}
        >
          <h1 src={add} onClick={handleAddComponent}>
            {' '}
            +{' '}
          </h1>
        </div>
      </div>
      {dynamicInput3.length === 0 && type !== 'Сектор' ? (
        <div style={{ width: '250px', paddingTop: '15px' }}>
          <Dropdown
            setId={setId}
            setType={setType3}
            handleAddComponent={handleAddComponent2}
            title={'Добавить поле'}
            data={request_type ?? []}
          />
        </div>
      ) : (
        ''
      )}
      <div style={{ display: 'flex', gap: '20px', paddingTop: '25px' }}>
        {dynamicInput3.map((component) => (
          <DynamicFields3
            key={component.id}
            title={value}
            type={type3}
            component={component}
            onValueChange={handleValueChange}
            handleAddComponent={handleAddComponent2}
            request_type={request_type}
          />
        ))}

        {/* <button className={styles.btn_add_field}><h5>Добавить поле </h5></button> */}
      </div>
    </div>
  )
}

export default DynamicFields2
