import React from 'react'
import styles from './../PublicationsPage.module.scss'
import right from 'assets/icons/chevron_right_black.png'
import down from 'assets/icons/expand_more_black.png'
const PublicationSection1 = ({ openSection = {}, setOpenSection, data }) => {
  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <img
          src={openSection.section1 ? down : right}
          className={styles.size}
          alt=""
          onClick={() =>
            setOpenSection((prevState) => ({
              ...prevState,
              section1: !prevState.section1,
            }))
          }
        />
        <h3>Научная деятельность</h3>
      </div>
    </div>
  )
}

export default PublicationSection1
