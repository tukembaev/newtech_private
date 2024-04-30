import Popover from '@mui/material/Popover'

import PopupState from 'material-ui-popup-state'
import React, { useState } from 'react'
import styles from './../TaskItemInfo.module.scss'
import ProfilePage from 'pages/ProfilePage/ProfilePage'

const InvolvedPeople = ({ text_role, involvePeople, setStateUserInfo }) => {
  const [userId, setUserId] = useState()

  const handleClick = (userId) => {
    setUserId(userId)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <>
            <div className={styles.item}>
              <p className={styles.item_text}>
                {text_role}:{' '}
                <div className={styles.item_div}>
                  {involvePeople
                    ?.filter((person) => person.member_type === text_role)
                    .map((filteredPerson) => (
                      <div
                        className={styles.item_div}
                        key={filteredPerson.member.id}
                        onMouseEnter={() =>
                          handleClick(filteredPerson.member.user)
                        }
                      >
                        <div
                          className={styles.cursor_pointer}
                          aria-owns={open ? 'mouse-over-popover' : undefined}
                          aria-haspopup="true"
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                        >
                          {' '}
                          | {filteredPerson.member.first_name}{' '}
                          {filteredPerson.member.surname}
                        </div>
                      </div>
                    ))}
                </div>
              </p>
            </div>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              onClose={handlePopoverClose}
            >
              <ProfilePage userId={userId} />
            </Popover>
          </>
        )}
      </PopupState>
    </>
  )
}

export default InvolvedPeople
