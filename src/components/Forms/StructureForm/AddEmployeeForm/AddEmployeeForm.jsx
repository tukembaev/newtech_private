import { useState } from 'react'
import AddNewEmp from './AddEmpForm/AddNewEmp'
import GetWorkingEmp from './AddEmpForm/GetWorkingEmp'
import styles from './AddEmployeeForm.module.scss'
import AddEmpPosition from './EmpPositionForm/AddEmpPosition'
import GetEmpPosition from './EmpPositionForm/GetEmpPosition'

const AddEmployeeForm = ({ data }) => {
  const [render, setRender] = useState(false)
  let structure_id
  let structure_name
  if ('managements' in data) {
    structure_id = data.id
    structure_name = 'organization'
  } else if ('branches' in data) {
    structure_id = data.id
    structure_name = 'management'
  } else if ('subbranches' in data) {
    structure_id = data.id
    structure_name = 'branch'
  } else {
    structure_id = data.id
    structure_name = 'subbranch'
  }

  return (
    <div className={styles.add_emp_form_wrapper}>
      <div>
        <h2>{data?.title}</h2>
        <div className={styles.add_emp_form_top}>
          <AddEmpPosition
            structure_name={data.structure_name}
            id={data.id}
            setRender={setRender}
          />

          <GetEmpPosition
            structure_name={data.structure_name}
            id={data.id}
            render={render}
            setRender={setRender}
          />
        </div>

        <div className={styles.add_emp_form_bottom}>
          <AddNewEmp
            structure_name={data.structure_name}
            id={data.id}
            render={render}
            setRender={setRender}
          />

          <GetWorkingEmp
            selected_title={data?.title}
            structure_name={data.structure_name}
            id={data.id}
            render={render}
            setRender={setRender}
          />
        </div>
      </div>
    </div>
  )
}

export default AddEmployeeForm
