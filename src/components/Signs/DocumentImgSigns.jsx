import React from 'react'
import styles from 'pages/StatementPage/components/StatementTable/StatementInfo/components/SimpleRaports/SimpleRaports.module.scss'
const DocumentImgSigns = ({
  signer_sign,
  signer_name,
  signer_sign_time,
  signer_type,
}) => {
  return (
    <>
      {signer_sign === null ? (
        ''
      ) : (
        <div className={styles.prorector_check}>
          <p>
            {signer_name}: <br />{' '}
            {signer_type === 'Одобрить'
              ? 'Одобрил(а)'
              : signer_type === 'Согласовать'
                ? 'Согласовал(а)'
                : signer_type === 'Ознакомиться'
                  ? 'Ознакомлен(а)'
                  : signer_type === 'Утвердить'
                    ? 'Утвердил(а)'
                    : signer_type === 'Резолюция'
                      ? 'Резолюция'
                      : ''}{' '}
            <br /> {signer_sign_time} <br />{' '}
          </p>

          <div>
            <img src={signer_sign} alt="" />
          </div>
        </div>
      )}
    </>
  )
}

export default DocumentImgSigns
