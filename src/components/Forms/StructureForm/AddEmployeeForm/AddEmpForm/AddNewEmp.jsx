import { Button } from 'components'
import Dropdown from 'components/Dropdown/Dropdown'
import EmployeeSelect from 'hooks/EmployeeSelect/EmployeeSelect'
import PositionSelect from 'hooks/PositionSelect/PositionSelect'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    GetPositionOfStructure,
    createEmpToStructure,
} from 'service/StructureService'
import {
    setNewEmp,
    setPositionOfStructureById,
} from 'store/slices/StructureSlice'
import Notification from 'utils/Notifications'
import styles from './AddEmpForm.module.scss'
const AddNewEmp = ({ structure_name, id, render, setRender }) => {
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
  const [employee, setEmployee] = useState('')
  const [bet, setBet] = useState('')
  const [stateName, setStateName] = useState('')
  const [data, setData] = useState()
  const dispatch = useDispatch()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const getData = async () => {
    try {
      const response = await GetPositionOfStructure(structure_name, id, data)
      dispatch(
        setPositionOfStructureById({
          structure_positions: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const positions = useSelector((state) => state.structure.structure_positions)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (employee === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали сотрудника',
        type: 'warning',
        sound: 'warning',
      })
    } else if (stateName === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали должность',
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
    } else if (bet === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали ставку',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        let mov_employee_id = employee
        let post = stateName.id
        let state = type_doc
        let stavka = bet

        let response = await createEmpToStructure(structure_name, id, {
          mov_employee_id,
          post,
          state,
          stavka,
        })
        dispatch(
          setNewEmp({
            mov_employee_id: employee,
            post,
            state,
            stavka,
          }),
        )

        setNotify({
          isOpen: true,
          message: 'Сотрудник успешно добавлен',
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
    <div>
      <div className={styles.flex_col}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '400px',
          }}
        >
          <h4 style={{ paddingBottom: '10px' }}>Сотрудник</h4>
          <EmployeeSelect selectedEmployee={setEmployee} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '400px',
          }}
        >
          <h4 style={{ paddingBottom: '10px' }}>Должность</h4>
          <PositionSelect
            dataPosition={positions}
            setDataPosition={setStateName}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '180px',
            height: '44px',
          }}
        >
          <h4>Ставка</h4>
          <Dropdown
            setId={setId2}
            setType={setBet}
            title={'Выбрать ставку'}
            data={request_type2 ?? []}
          />
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', width: '180px' }}
        >
          <h4>Штат</h4>
          <Dropdown
            setId={setId3}
            setType={setType_doc}
            title={'Выбрать штат'}
            style={{ height: '44px' }}
            data={request_type ?? []}
          />
        </div>
        <Button className={styles.add_pos} onClick={handleSubmit}>
          Добавить{' '}
        </Button>
      </div>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default AddNewEmp
