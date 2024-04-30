import { useEffect } from 'react'

const WebSocketComponent = ({
  url,
  onOpen,
  onClose,
  onError,
  onMessage,
  setSocket,
}) => {
  useEffect(() => {
    const socket = new WebSocket(url)
    socket.addEventListener('open', onOpen)
    socket.addEventListener('close', onClose)
    socket.addEventListener('error', onError)
    socket.addEventListener('message', onMessage)

    setSocket(socket) // Pass the socket back to ChatPageContainer

    return () => {
      socket.close()
    }
  }, [url, onOpen, onClose, onError, onMessage, setSocket])

  return null
}

export default WebSocketComponent
