import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetEmpOfStructure } from 'service/StructureService'
import { setEmpOfStructureById } from 'store/slices/StructureSlice'
import styles from './AddEmpForm.module.scss'

const GetWorkingEmp = ({ selected_title, structure_name, id, render }) => {
  const [data, setData] = useState()
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await GetEmpOfStructure(structure_name, id, data)
      dispatch(
        setEmpOfStructureById({
          structure_employees: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    getData()
  }, [render])
  const structure_emp = useSelector(
    (state) => state.structure.structure_employees,
  )

  return (
    <div className={styles.get_emp_position_wrapper}>
      <div className={styles.heading}>
        Сотрудники работающие в {selected_title}
      </div>
      <div className={styles.body}>
        {structure_emp.map((item, index) => (
          <div className={styles.position_card} key={item.id}>
            <div style={{ display: 'flex', gap: '25px' }}>
              <p>{index + 1}</p>
              <p>{item.employee}</p>
              <p>{item.title}</p>
              <p>{item.stavka}</p>
              <p>{item.state}</p>
            </div>
          </div>
        ))}
        {/* <div className={styles.position_card}>
        <div style={{display:'flex', gap:'25px'}}>
         <p>1</p>
         <p>Админ</p>
        </div>
        <div style={{display:'flex' , gap:'25px'}}>
          <p>Основной</p>
          <p>1</p>
          <p>0</p>
          </div>
      </div> */}
      </div>
    </div>
  )
}

export default GetWorkingEmp
