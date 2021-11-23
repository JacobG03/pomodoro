import styles from './NavbarMore.module.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'


export class UserOpen extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className={styles.UserOpen}>
        <span>Status change</span>
        <span>Stats view</span>
        <span>Sign out</span>
      </div>
    )
  }
}


export class Settings extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className={`${styles.SettingsClosed} ${this.props.display ? styles.active: null}`}
           onClick={() => this.props.setDisplay(prev => !prev)}
      >
        <FontAwesomeIcon icon={faCog} />
      </div>
    )
  }
}


export class SettingsOpen extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className={styles.SettingsOpen}>
        <span>Change username</span>
        <span>Change avatar</span>
        <span>Timers Change (1 - 60 min)</span>
        <span>Change session names</span>
        <span>Change Email</span>
        <span>Change password</span>
        <span>Delete Account</span>
      </div>
    )
  }
}

