import React from 'react'
import QRCode from 'react-qr-code'
import styles from 'pages/StatementPage/components/StatementTable/StatementInfo/components/SimpleRaports/SimpleRaports.module.scss'
const DocumentsQrSigns = ({ qr_text, qr_name }) => {
  return (
    <>
      {qr_text === null ? (
        ''
      ) : (
        <div className={styles.prorector_check}>
          <p>
            Подпись {qr_name}: <br /> <br />{' '}
          </p>

          <div
            style={{
              height: 'auto',
              maxWidth: 64,
              margin: '0 auto',
              width: '100%',
            }}
          >
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={qr_text}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DocumentsQrSigns
