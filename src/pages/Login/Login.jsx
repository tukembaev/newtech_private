import React from 'react'
import { LoginForm } from 'components/index'
import styles from './Login.module.scss'
import cx from 'classnames'
import authImg from 'assets/img/auth-img.png'

function Login() {
  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.inner, styles.login)}>
        <div className={styles.login__inner}>
          <LoginForm />
        </div>
      </div>
      <div className={cx(styles.inner, styles.welcome)}>
        <div className={styles.welcome__inner}>
          <div>
            <img src={authImg} alt="Auth img" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
