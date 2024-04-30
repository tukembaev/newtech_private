import add from 'assets/icons/plus.svg'
import Dropdown from 'components/Dropdown/Dropdown'
import { useEffect, useState } from 'react'
import styles from './../StructureForm.module.scss'
import DynamicFields2 from './DynamicFields2'

const DynamicFields = ({
  component,
  onValueChange,
  handleAddComponent,
  type,
  department,
  request_type,
  title,
}) => {
  const [value, setValue] = useState('')
  const [id, setId] = useState('')
  const [type2, setType2] = useState('')
  const [dynamicInput2, setDynamicInput2] = useState([])

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(event.target.value)
    onValueChange(component.id, newValue, dynamicInput2)
  }

  const handleAddComponent2 = () => {
    setDynamicInput2((prevComponents) => [
      ...prevComponents,
      { id: Date.now(), title: '' },
    ])
  }

  const handleValueChange = (id, newValue, subbranches) => {
    setDynamicInput2((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === id) {
          if (department) {
            return { ...component, title: newValue }
          } else {
            return { ...component, title: newValue, subbranches: subbranches }
          }
        }
        return component
      }),
    )
  }

  if (type === 'Управление') {
    request_type = [{ id: 0, label: 'Отдел' }]
  } else if (type === 'Отдел') {
    request_type = [{ id: 0, label: 'Сектор' }]
  }

  useEffect(() => {
    onValueChange(component.id, value, dynamicInput2)
  }, [dynamicInput2])

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
      {dynamicInput2.length === 0 ? (
        <div style={{ width: '250px', paddingTop: '15px' }}>
          <Dropdown
            setId={setId}
            setType={setType2}
            handleAddComponent={handleAddComponent2}
            title={'Добавить поле'}
            data={request_type ?? []}
          />
        </div>
      ) : (
        ''
      )}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          paddingTop: '25px',
          borderBottom: '1px solid black',
        }}
      >
        {dynamicInput2.map((component) => (
          <DynamicFields2
            key={component.id}
            title={value}
            type={type2}
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

export default DynamicFields
