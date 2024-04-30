import React from 'react'
import styles from './../PublicationsPage.module.scss'
import right from 'assets/icons/chevron_right_black.png'
import down from 'assets/icons/expand_more_black.png'
const PublicationSection2 = ({ openSection = {}, setOpenSection, data }) => {
  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <img
          src={openSection?.section2 ? down : right}
          className={styles.size}
          alt=""
          onClick={() =>
            setOpenSection((prevState) => ({
              ...prevState,
              section2: !prevState?.section2,
            }))
          }
        />
        <h3>Книга</h3>
      </div>
      {openSection.section2 ? (
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
                  src={openSection?.section2more ? down : right}
                  className={styles.size}
                  alt=""
                  onClick={() =>
                    setOpenSection((prevState) => ({
                      ...prevState,
                      section2more: !prevState.section2more,
                    }))
                  }
                />
              </div>
              {openSection.section2more ? (
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

export default PublicationSection2
