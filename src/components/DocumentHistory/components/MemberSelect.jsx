import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { getMyMembers } from 'service/CollectiveService'
import { setMyMembers } from 'store/slices/CollectiveSlice'
import styles from './../DocumentHistory.module.scss'
const MemberSelect = ({
  approvalId,
  setOrderCount,
  order_count,
  memberInfo,
  setMemberInfo,
  setMemberArray,
  memberArray,
  clear,
  setClear,
}) => {
  const [data] = useState()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const getData = async () => {
    try {
      let response = await getMyMembers(data)

      dispatch(
        setMyMembers({
          members: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const myTeam = useSelector((state) => state.collective.members)

  const forSelect = myTeam?.confirmed

  //Consts & Let

  const handleSelect = (forSelect) => {
    setOrderCount(order_count + 1)
    let choose = {
      id: order_count,
      user_id: forSelect.value,
      type_approval: approvalId.approval_id,
    }

    let infoForOutput = {
      id: order_count,
      type_approval: approvalId.approval_name,
      member: forSelect.label,
    }
    setMemberArray([...memberArray, choose])
    setMemberInfo([...memberInfo, infoForOutput])
  }
  useEffect(() => {
    if (forSelect?.length !== 0) {
      setIsLoading(false)
    }
  }, [forSelect])

  return (
    <div className={styles.inline}>
      <div className={styles.member_select}>
        <Select
          closeMenuOnSelect={true}
          options={forSelect}
          onChange={handleSelect}
          isSearchable={true}
          placeholder="Выбрать сотрудника"
          autosize={true}
          noOptionsMessage={() => 'Поиск не дал результатов'}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default MemberSelect
