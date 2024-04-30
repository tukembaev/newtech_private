import add from 'assets/icons/plus.svg'
import { useState } from 'react'
import styles from './../StructureForm.module.scss'

const DynamicFields3 = ({
  component,
  onValueChange,
  handleAddComponent,
  type,
  title,
}) => {
  const [value, setValue] = useState('')
  const [id, setId] = useState('')
  const [type3, setType3] = useState('')
  const [dynamicInput4, setDynamicInput4] = useState([])

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(event.target.value)
    onValueChange(component.id, newValue)
  }

  const handleValueChange = (id, newValue) => {
    setDynamicInput4((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === id) {
          return { ...component, value: newValue }
        }
        return component
      }),
    )
  }

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
    </div>
  )
}

export default DynamicFields3
