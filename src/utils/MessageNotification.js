import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function MessageNotification(props) {
  const { notify, setNotify } = props
  const navigate = useNavigate()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setNotify({
      ...notify,
      isOpen: false,
    })
  }

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        icon={false}
        style={{
          color: 'black',
          background: 'rgba(255, 255, 255, 0.76)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
        }}
        severity={notify.type}
        onClick={() => navigate(`/${notify?.link}`)}
      >
        <div style={{ display: 'flex', gap: '15px' }}>
          <img
            src={notify.image}
            alt=""
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginRight: '10px',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flexStart',
              gap: '5px',
            }}
          >
            <h3 style={{ fontFamily: ' Nunito ,sans-serif' }}>
              {' '}
              {notify.sender}{' '}
            </h3>
            <h4 style={{ fontFamily: ' Nunito ,sans-serif' }}>
              {notify.message}{' '}
            </h4>
          </div>
        </div>
      </Alert>
    </Snackbar>
  )
}
