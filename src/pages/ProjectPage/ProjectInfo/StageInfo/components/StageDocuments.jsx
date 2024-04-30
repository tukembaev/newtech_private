import React from 'react'
import styles from './ResAndDoc.module.scss'
import pen from 'assets/icons/pencil.svg'
import download from 'assets/icons/download.svg'
const StageDocuments = ({ data, setOpenModal, status, role }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4>Документы</h4>
        <div style={{ display: 'flex', gap: '15px' }}>
          {status === 'Завершен' ? (
            ''
          ) : (
            <button style={{ display: 'flex', background: '#0094FF' }}>
              <img src={pen} alt="" />{' '}
              <p
                style={{ paddingTop: '4px', paddingLeft: '4px' }}
                onClick={() => setOpenModal(true)}
              >
                Добавить{' '}
              </p>
            </button>
          )}
        </div>
      </div>
      <div
        className={styles.body}
        style={{ maxHeight: '350px', overflowY: 'auto' }}
      >
        <table className={styles.table__wrapper_left}>
          <thead className={styles.table__head_left}>
            <tr className={styles.table__row_left}>
              <th className={styles.table__item_left}>
                <span className={styles.table__title_left}>Наименование</span>
              </th>
            </tr>
          </thead>
          <tbody className={styles.table__body_left}>
            {data?.map((item) => {
              const fileUrlParts = item.file.split('/')
              const fileName = decodeURIComponent(
                fileUrlParts[fileUrlParts.length - 1],
              )

              return (
                <tr className={styles.table__row_left} key={item.file}>
                  <td className={styles.table__item_left}>
                    <span className={styles.table__title_left}>{fileName}</span>
                  </td>
                  <td
                    className={styles.table__item_left}
                    style={{ textAlign: 'right' }}
                  >
                    <span className={styles.table__title_left}>
                      <a href={item.file} download>
                        {' '}
                        <img className={styles.size} src={download} alt="" />
                      </a>
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StageDocuments
