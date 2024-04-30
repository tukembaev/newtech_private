import { useState } from 'react'
import styles from './StatementForm.module.scss'

import RaportForm from './components/RaportForm/RaportForm'

import userInfo from 'utils/userInfo'

function StatementForm({ setRender, setState }) {
  //UseState
  const [id, setId] = useState(0)
  const [type, setType] = useState(0)
  const [isShown, setIsShown] = useState(false)
  //Const & Let
  const user = userInfo()
  //Functions
  const handleClick = (event) => {
    setIsShown((current) => !current)
  }
  return (
    <div className={styles.statement_wrapper}>
      <div className={styles.statement_body}>
        <RaportForm
          userId={user.employeeId}
          setRender={setRender}
          setState={setState}
        />
      </div>
    </div>
  )
}

export default StatementForm
