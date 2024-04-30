import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import styles from './SimpleRaportPdf.module.scss'
import QRCode from 'react-qr-code'
const SimpleRaportPdf = ({ info }) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Simpleraport',
    onAfterPrint: () => alert('Print success'),
  })

  return (
    <>
      <div className={styles.simple_raports_info_wrapper} ref={componentRef}>
        <div className={styles.simple_raports_info_heading}>
          <div className={styles.left}>
            <p>Номер Рапорта: {info.number} </p>
            <p>Статус: {info.status}</p>

            <p>Тип рапорта:{info.type}</p>
            <p>Назначение рапорта: {info.podtypezayavki}</p>
          </div>
          <div className={styles.right}>
            <p>Проректору по АХД</p>
            <p>Асиеву А.Т.</p>
            <p>от</p>
            <p>
              {info.employee.surname} {info.employee.first_name}
            </p>
          </div>
        </div>
        <div className={styles.simple_raports_info_body}>
          <h1>Рапорт</h1>
          <div className={styles.simple_raports_info_discrip}>
            <p>{info.text}</p>
          </div>
          <div className={styles.all_checks}>
            <div className={styles.prorector_check}>
              {info.prorectorcheck.includes('Отказано') ? (
                <p className={styles.text_sign}>
                  Подпись проректора: <br />
                  Отказано{' '}
                </p>
              ) : (
                <p>
                  Подпись проректора: <br /> <br />{' '}
                </p>
              )}
              {info.prorectorcheck === null ? (
                ''
              ) : (
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
                    value={info.prorectorcheck}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              )}
            </div>

            <div className={styles.ispol_check}>
              {info.ispolnpodcheck.includes('Отказано') ? (
                <p className={styles.text_sign}>
                  Подпись заявителя: <br />
                  Отказано{' '}
                </p>
              ) : (
                <p>
                  Подпись заявителя: <br /> <br />{' '}
                </p>
              )}
              {info.ispolnpodcheck === null ? (
                ''
              ) : (
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
                    value={info.prorectorcheck}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              )}
            </div>
            <div className={styles.prorector_check}>
              {info.rukovpodcheck.includes('Отказано') ? (
                <p className={styles.text_sign}>
                  Подпись руководителя: <br />
                  Отказано{' '}
                </p>
              ) : (
                <p>
                  Подпись руководителя: <br /> <br />{' '}
                </p>
              )}

              {info.rukovpodcheck === null ? (
                ''
              ) : (
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
                    value={info.rukovpodcheck}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePrint}> Heloo</button>
    </>
  )
}

export default SimpleRaportPdf
