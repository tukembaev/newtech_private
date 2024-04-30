import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPositionOfStructure } from 'service/StructureService'
import { setPositionOfStructureById } from 'store/slices/StructureSlice.js'
import styles from './AddEmpPosition.module.scss'

const GetEmpPosition = ({ structure_name, id, render, setRender }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

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

  return (
    <div className={styles.get_emp_position_wrapper}>
      <div className={styles.heading}>Должности</div>
      <div className={styles.body}>
        {positions.map((item, index) => (
          <div className={styles.position_card} key={item.id}>
            <div style={{ display: 'flex', gap: '25px' }}>
              <p>{index + 1}</p>
              <p>{item.title}</p>
              <p>{item.state}</p>
              <p>{item.wage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetEmpPosition
