import download from 'assets/icons/download.png'
import file_icon from 'assets/icons/file.png'
import pdf_img from 'assets/icons/pdf.png'
import { useState } from 'react'

const FileBlock = ({ file_url }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const renderContent = () => {
    const fileExtension = file_url?.split('.').pop().toLowerCase()

    if (fileExtension === 'pdf') {
      return (
        <>
          {isHovered ? (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                background: '#ffffffbd',
                width: '50px',
                borderRadius: '15px',
              }}
            >
              <a href={file_url} title={file_url} download>
                {' '}
                <img
                  src={download}
                  alt="Image"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </a>
            </div>
          ) : (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                background: '#ffffff59',
                width: '50px',
                borderRadius: '15px',
              }}
            >
              <a href={file_url} title={file_url} download>
                {' '}
                <img
                  src={pdf_img}
                  alt="Image"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </a>
            </div>
          )}
        </>
      )
    } else if (
      fileExtension === 'jpeg' ||
      fileExtension === 'jpg' ||
      fileExtension === 'png' ||
      fileExtension === 'docx' ||
      fileExtension === 'doc' ||
      fileExtension === 'pptx' ||
      fileExtension === 'gif' ||
      fileExtension === 'webp'
    ) {
      return (
        <>
          {isHovered ? (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                background: '#ffffffbd',
                width: '50px',
                borderRadius: '15px',
              }}
            >
              <a href={file_url} title={file_url} download>
                {' '}
                <img
                  src={download}
                  alt="Image"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </a>
            </div>
          ) : (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                background: '#ffffff59',
                width: '50px',
                borderRadius: '15px',
              }}
            >
              <a href={file_url} title={file_url} download>
                {' '}
                <img
                  src={file_icon}
                  alt="Image"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </a>
            </div>
          )}
        </>
      )
    } else {
      return <div>Unsupported file format</div>
    }
  }
  return <>{renderContent()}</>
}

export default FileBlock
