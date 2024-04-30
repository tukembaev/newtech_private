import agree from 'assets/icons/agree.png'
import cancel from 'assets/icons/declin.png'
import retry from 'assets/icons/retry.png'
import styles from '../DocumentHistory.module.scss'

import Popover from '@mui/material/Popover'
import ProfileCard from 'components/ProfileCard/ProfileCard'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
const AgreementCard = ({
  user,
  setOpenModal,
  item,
  setIdMember,
  prorector,
}) => {
  return (
    <div className={styles.member_card_wrapper}>
      <>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <>
              <div className={styles.member_card} style={{ cursor: 'pointer' }}>
                <div className={styles.member_flex}>
                  <img src={item.image} alt="" {...bindTrigger(popupState)} />

                  <div className={styles.member_info}>
                    <div>
                      <p
                        className={styles.member_fio}
                        {...bindTrigger(popupState)}
                      >
                        {item.name}
                        {item.is_online ? (
                          <span
                            style={{
                              display: 'block',
                              width: '8px',
                              height: '8px',
                              background: 'green',
                              borderRadius: '50%',
                            }}
                          ></span>
                        ) : null}
                      </p>
                      <p className={styles.member_vid}>{item.position}</p>
                      <p className={styles.member_position}>
                        {item.name_approval}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.member_flex2}>
                  {item?.name?.includes(user?.surName) &&
                  item.status === 'На рассмотрении' &&
                  item.turn ? (
                    <div className={styles.member_actions}>
                      <img
                        src={cancel}
                        onClick={(e) => {
                          setOpenModal(true)
                          setIdMember({
                            id: item.id,
                            member: item.user,
                            member_queue: item.member_queue,
                            member_choose_action: 'Отказано',

                            employeeId: item.member,
                          })
                        }}
                        className={styles.size2}
                        alt=""
                        title="Отказать"
                      />
                      <img
                        src={agree}
                        onClick={(e) => {
                          setOpenModal(true)
                          setIdMember({
                            id: item.id,
                            member: item.user,
                            member_queue: item.member_queue,
                            member_choose_action: 'Одобрено',
                            employeeId: item.member,
                          })
                        }}
                        className={styles.size2}
                        alt=""
                        title={item.name_approval}
                      />
                    </div>
                  ) : prorector.includes(user.surName) &&
                    item.status === 'Отказано' &&
                    item.turn === true ? (
                      <div className={styles.member_actions}>
                        <img
                        src={retry}
                        onClick={(e) => {
                          setOpenModal(true)
                          setIdMember({
                            id: item.id,
                            member: item.user,
                            member_queue: item.member_queue,
                            member_choose_action: 'На рассмотрении',

                            employeeId: item.member,
                          })
                        }}
                        className={styles.size2}
                        alt=""
                      />{' '}
                      </div>
                  ) : (
                    <div className={styles.member_flex3}>
                      {' '}
                      {item.status === 'На рассмотрении' ? (
                        <div className={styles.member_status_pending}>
                          <span>В ожидании</span>
                        </div>
                      ) : item.status === 'Отказано' ? (
                        <div className={styles.member_status_canceled}>
                          <span>Отказано</span>
                        </div>
                      ) : (
                        <div className={styles.member_status_agree}>
                          <span>Одобрено</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <ProfileCard userId={item.user} />
              </Popover>
            </>
          )}
        </PopupState>
      </>
      {item.member_refusal !== null && item.member_refusal !== undefined ? (
        <p className={styles.member_comment}>
          {item.status === 'Отказано' ? (
            <span>Причина отказа участника: </span>
          ) : (
            <span>Комментарий участника: </span>
          )}
          {item.member_refusal}
        </p>
      ) : (
        ''
      )}
    </div>
  )
}

export default AgreementCard
