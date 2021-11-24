import styles from './NavbarMore.module.css'
import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCog, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'


export class UserOpen extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className={styles.UserOpen}>
        <ChangeUsername 
          updateUsername={this.props.updateUsername}
          user={this.props.user}
        />
        <span>Change avatar</span>
        <span>Sign out</span>
      </div>
    )
  }
}


function ChangeUsername(props) {
  const [display, setDisplay] = useState(false)
  const username = useRef(null)

  const updateUsername = username => {
    let data = {'username': username}
    fetch('/settings/username', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 200) {
        props.updateUsername(username)
        setDisplay(!display)
      }
      return res.json()
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  if (display) {
    return (
      <div className={styles.ChangeUsername}>
        <input type='text' ref={username}/>
        <FontAwesomeIcon icon={faCheck} onClick={() => updateUsername(username.current.value)}/>
        <FontAwesomeIcon icon={faTimes} onClick={() => setDisplay(!display)} />
      </div>
    )
  }
  return (
    <div className={styles.ChangeUsername}>
      <span>Username:</span>
      <span>{props.user.username}</span>
      <FontAwesomeIcon icon={faEdit} onClick={() => setDisplay(!display)}/>
    </div>
  )
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
        <span>Change Email</span>
        <span>Change password</span>
        <span>Delete Account</span>
      </div>
    )
  }
}

