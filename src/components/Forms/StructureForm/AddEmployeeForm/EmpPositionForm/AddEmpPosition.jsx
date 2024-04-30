import { TextareaAutosize } from '@mui/material'
import { useState } from 'react'
import styles from './AddEmpPosition.module.scss'

import { Button } from 'components'
import Dropdown from 'components/Dropdown/Dropdown'
import { useDispatch } from 'react-redux'
import { createPositionToStructure } from 'service/StructureService'
import { setNewPosition } from 'store/slices/StructureSlice'
import Notification from 'utils/Notifications'

const AddEmpPosition = ({ structure_name, id, setRender }) => {
  const [id2, setId2] = useState('')
  const [id3, setId3] = useState('')
  const [type_doc, setType_doc] = useState('')
  const request_type = [
    { id: 0, label: 'Основной' },
    { id: 1, label: 'Совмещение' },
  ]
  const request_type2 = [
    { id: 0, label: '0.25' },
    { id: 1, label: '0.5' },
    { id: 2, label: '1' },
    { id: 3, label: '1.5' },
  ]
  const [positionName, setPositionName] = useState('')
  const [bet, setBet] = useState('')
  const [stateName, setStateName] = useState()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (positionName === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не ввели название должности',
        type: 'warning',
        sound: 'warning',
      })
    } else if (bet === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали ставку',
        type: 'warning',
        sound: 'warning',
      })
    } else if (type_doc === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали штат',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        let title = positionName
        let state = type_doc
        let wage = parseInt(bet)
        let response = await createPositionToStructure(structure_name, id, {
          title,
          state,
          wage,
        })
        dispatch(
          setNewPosition({
            title: positionName,
            state: type_doc,
            wage: bet,
          }),
        )

        setNotify({
          isOpen: true,
          message: 'Должность успешно добавлена',
          type: 'success',
          sound: 'success',
        })

        setRender(true)
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
    <div className={styles.add_emp_position_wrapper}>
      <div className={styles.flex_col}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Должность</h4>
          <TextareaAutosize
            id="positionName"
            name="positionName"
            className={styles.type_input}
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            placeholder="Название должности:"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Ставка</h4>
          <TextareaAutosize
            id="positionName"
            name="positionName"
            className={styles.stavka_input}
            value={bet}
            onChange={(e) => setBet(e.target.value)}
            placeholder="Ставка:"
          />
          {/* <Dropdown setId={setId3} setType={setBet} title = {'Выбрать ставку'} data = {request_type2 ?? []}/> */}
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', width: '180px' }}
        >
          <h4>Штат</h4>
          <Dropdown
            setId={setId2}
            setType={setType_doc}
            title={'Выбрать штат'}
            data={request_type ?? []}
          />
        </div>
        <Button className={styles.add_pos} onClick={handleSubmit}>
          {' '}
          Добавить{' '}
        </Button>
      </div>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default AddEmpPosition
