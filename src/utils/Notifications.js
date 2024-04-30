import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import successSound from 'assets/sound/created.mp3'
import defaultSound from 'assets/sound/defaultSound.mp3'
import receivedSound from 'assets/sound/din.mp3'
import enterSystem from 'assets/sound/enter.mp3'
import errorSound from 'assets/sound/error.mp3'
import messageSended from 'assets/sound/messagesend.mp3'
import warningSound from 'assets/sound/warningSound.mp3'
import { useEffect } from 'react'
export default function Notification(props) {
  const { notify, setNotify } = props
  let mute = localStorage.getItem('mute')

  const handleClose = (event, reason) => {
    if (reason === `clickaway`) {
      return
    }
    setNotify({
      ...notify,
      isOpen: false,
    })
  }
  useEffect(() => {
    if (mute === 'true') {
      return
    }
    const playSound = () => {
      let sound
      switch (notify.sound) {
        case 'received':
          sound = new Audio(receivedSound)
          break
        case 'entry':
          sound = new Audio(enterSystem)
          break
        case 'error':
          sound = new Audio(errorSound)
          break
        case 'warning':
          sound = new Audio(warningSound)
          break
        case 'success':
          sound = new Audio(successSound)
          break
        case 'sendMessage':
          sound = new Audio(messageSended)
          break
        case 'default':
        default:
          sound = new Audio(defaultSound)
          break
      }
      sound.play()
    }
    if (notify.sound) {
      playSound()
    }
  }, [notify.sound, notify.message])

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}
