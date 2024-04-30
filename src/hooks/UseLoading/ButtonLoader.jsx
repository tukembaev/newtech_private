import { ScaleLoader } from 'react-spinners'
const ButtonLoader = ({ children, color, loading, position }) => {
  return (
    <>
      {loading ? (
        <div
          style={{
            textAlign: position,

            height: '50px',
          }}
        >
          <ScaleLoader color={color} size={30} />
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default ButtonLoader
