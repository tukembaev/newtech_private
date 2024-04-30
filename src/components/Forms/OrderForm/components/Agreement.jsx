import ApprovalSelect from 'DocumentHistory/components/ApprovalSelect'
import MemberSelect from 'DocumentHistory/components/MemberSelect'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    getPositionEmpData
} from 'service/OrderService'
import {
    setPositionEmpById
} from 'store/slices/OrderSlice'
import Notification from 'utils/Notifications'
import styles from './OrderSignerAgreement.module.scss'
const Agreement = ({
  dataSigners,
  setRender,
  setState,
  setMemberArrayOrder,
  setAgreementOutPut,
  signer,
}) => {
  const dispatch = useDispatch()
  const [id, setId] = useState()
  const [data, setData] = useState()
  const [order_count, setOrderCount] = useState(1)
  const [approvalId, setApprovalId] = useState({
    approval_name: '',
    approval_id: '',
  })
  const [memberInfo, setMemberInfo] = useState([])
  const [memberArray, setMemberArray] = useState([])
  const [clear, setClear] = useState(false)

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const getData = async () => {
    try {
      let response = await getPositionEmpData(id, data)

      dispatch(
        setPositionEmpById({
          posempl: response.data,
        }),
      )
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  const deleteElement = (id) => {
    // удаление объекта из массива при совпадении id
    setMemberInfo(memberInfo.filter((obj) => obj.id != id))
    setMemberArray(memberArray.filter((obj) => obj.id != id))
    setOrderCount(order_count - 1)
  }

  setMemberArrayOrder(memberArray)

  useEffect(() => {
    setClear(false)
  }, [clear])

  return (
    <div>
      <p>Согласуют</p>

      <div className={styles.test}>
        {memberArray.length === 7 ? (
          <div style={{ paddingBottom: '15px' }}>
            Достигнут лимит согласования
          </div>
        ) : (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <ApprovalSelect setApprovalId={setApprovalId} clear={clear} />
            <MemberSelect
              order_count={order_count}
              setOrderCount={setOrderCount}
              approvalId={approvalId}
              memberInfo={memberInfo}
              setMemberInfo={setMemberInfo}
              setMemberArray={setMemberArray}
              memberArray={memberArray}
              clear={clear}
            />
          </div>
        )}

        {/* <Button className={styles.btn22} onClick={()=> setClear(true)}> Добавить </Button> */}
      </div>

      <div>
        <h3 style={{ paddingBottom: '10px' }}>Выбранные согласующие</h3>
        {memberInfo === undefined
          ? []
          : memberInfo.map((item, index) => {
              return (
                <div key={item.id} className={styles.flex}>
                  <h4>
                    {index + 1} {item.type_approval} : {item.member}{' '}
                  </h4>

                  {/* <img onClick={() => deleteElement(item.id)} className={styles.size} src={bucket} alt="" /> */}
                  <span
                    onClick={() => deleteElement(item.id)}
                    className={styles.size}
                  >
                    x
                  </span>
                </div>
              )
            })}
      </div>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default Agreement
