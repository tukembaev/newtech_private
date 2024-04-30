import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import close from 'assets/icons/close.png'
import styles from 'components/Navbar/Navbar.module.scss'
import React from 'react'
import SlidingPane from 'react-sliding-pane'
import './../styles/react-sliding-pane-custom.css'
const SlidingPaneUtil = ({
  children,
  state,
  setState,
  title,
  size,
  isWhite,
}) => {
  const customClass = isWhite ? 'custom_background' : styles.some_custom_class2
  return (
    <>
      <SlidingPane
        className={customClass}
        overlayClassName={styles.some_custom_overlay_class2}
        isOpen={state.isPaneOpen}
        title={title}
        width={size}
        hideHeader={true}
        shouldCloseOnEsc={true}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setState({ isPaneOpen: false })
        }}
      >
        <div className={styles.sliding_pane_header}>
          {window.innerWidth <= 600 ? (
            <img
              src={close}
              style={{
                width: '25px',
                height: '25px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
              alt=""
              onClick={() => {
                setState({ isPaneOpen: false })
              }}
            />
          ) : (
            <ChevronLeftIcon
              style={{ marginTop: '19px', cursor: 'pointer' }}
              onClick={() => {
                setState({ isPaneOpen: false })
              }}
            />
          )}

          <h2
            style={{ color: isWhite ? 'black' : 'white', paddingTop: '15px' }}
          >
            {title}
          </h2>
        </div>
        {children}
      </SlidingPane>
      <style>
        {`
          .custom_background {
            background: #fff; /* Set the background color to white */
          }
        `}
      </style>
    </>
  )
}
export default React.memo(SlidingPaneUtil)
