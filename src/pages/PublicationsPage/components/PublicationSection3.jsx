import React from 'react'
import styles from './../PublicationsPage.module.scss'
import right from 'assets/icons/chevron_right_black.png'
import down from 'assets/icons/expand_more_black.png'
const PublicationSection3 = ({ openSection = {}, setOpenSection, data }) => {
  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <img
          src={openSection.section3 ? down : right}
          className={styles.size}
          alt=""
          onClick={() =>
            setOpenSection((prevState) => ({
              ...prevState,
              section3: !prevState.section3,
            }))
          }
        />
        <h3>Методичка</h3>
      </div>
      {openSection.section3 ? (
        <div className={styles.section_body}>
          <div className={styles.card}>
            <div className={styles.card_header}>
              <h3>Kyrgyz State Technical University: Bishkek, KG</h3>
            </div>
            <div className={styles.card_body}>
              <div className={styles.card_body_header}>
                <div>
                  <p>title</p>
                  <p>date</p>
                </div>
                <img
                  src={openSection.section3more ? down : right}
                  className={styles.size}
                  alt=""
                  onClick={() =>
                    setOpenSection((prevState) => ({
                      ...prevState,
                      section3more: !prevState.section3more,
                    }))
                  }
                />
              </div>
              {openSection.section3more ? (
                <div className={styles.card_body_more}>
                  <p>link</p>
                  <p>doi</p>
                  <p>issn</p>
                  <p>eid</p>
                  <p>country</p>
                </div>
              ) : null}
            </div>
            <div className={styles.card_footer}>
              Источники :{' '}
              <div className={styles.card_footer_members}>
                <img src="" className={styles.size2} alt="" /> Mirlan Chynybaev
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default PublicationSection3
