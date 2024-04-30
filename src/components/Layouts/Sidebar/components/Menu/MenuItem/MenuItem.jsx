import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './MenuItem.module.scss'
import menuArrow from 'assets/icons/menu-arrow.svg'

function MenuItem({ links, title }) {
  const [isActive, setIsActive] = useState(false)
  const handleDropdown = () => {
    if (isActive) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }

  return (
    <li
      className={cx(
        styles.menu__item__dropdown,
        isActive ? styles.isActive : '',
      )}
    >
      <div
        onClick={() => handleDropdown()}
        className={cx(styles.menu__dropdown, isActive ? styles.isActive : '')}
      >
        <div className={styles.menu__dropdown__item}>
          <span className={styles.menu__dropdown__title}>{title}</span>
          <span className={styles.menu__dropdown__icon__wrapper}>
            <img src={menuArrow} />
          </span>
        </div>
        <div className={styles.menu__dropdown__sublist}>
          <ul>
            {links.map((link) => {
              return (
                <li>
                  <NavLink className={styles.menu__link} to={link.to}>
                    {link.text}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </li>
  )
}

MenuItem.propTypes = {
  links: PropTypes.array,
  title: PropTypes.string,
}

MenuItem.defaultProps = {
  links: [],
  title: '',
}

export default MenuItem
