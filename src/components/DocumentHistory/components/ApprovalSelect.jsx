import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { getAllApproval } from 'service/StatementsService'
import { setAllApproval } from 'store/slices/StatementsSlice'
import styles from './../DocumentHistory.module.scss'
const ApprovalSelect = ({ setApprovalId, clear }) => {
  const [data] = useState()
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await getAllApproval(data)

      dispatch(
        setAllApproval({
          allapproval: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const forSelect = useSelector((state) => state.statement.allapproval)

  //Consts & Let

  const handleSelect = (forSelect) => {
    setApprovalId({
      approval_name: forSelect.label,
      approval_id: forSelect.id,
    })
  }

  return (
    <div className={styles.inline}>
      <div className={styles.approval_select}>
        <Select
          closeMenuOnSelect={true}
          options={forSelect}
          onChange={handleSelect}
          isSearchable={true}
          placeholder="Выбрать вид согласования"
          autosize={true}
        />
      </div>{' '}
    </div>
  )
}

export default ApprovalSelect
