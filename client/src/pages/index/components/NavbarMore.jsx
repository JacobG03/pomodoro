import styles from './NavbarMore.module.css'
import React, { useState, useRef, useEffect } from 'react'
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
        <ChangeAvatar 
          user={this.props.user}
          updateAvatar={this.props.updateAvatar}
        />
        <button onClick={() => this.props.signOut()}>Sign out</button>
      </div>
    )
  }
}


function ChangeUsername(props) {
  const [display, setDisplay] = useState(false)
  const username = useRef(null)

  useEffect(() => {
    if (display) {
      username.current.value = props.user.username
    }
  }, [display, props.user.username])

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
      <span>{props.user.username}</span>
      <FontAwesomeIcon className={styles.EditIcon} icon={faEdit} onClick={() => setDisplay(!display)}/>
    </div>
  )
}


function ChangeAvatar(props) {
  const [edit, canEdit] = useState(false)
  const avatar = useRef(null)

  useEffect(() => {
    if (edit) {
      avatar.current.value = props.user.avatar
    }
  }, [edit, props.user.avatar])

  const updateAvatar = avatar => {
    let data = {'avatar': avatar}
    fetch('/settings/avatar', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 200) {
        props.updateAvatar(avatar)
        canEdit(!edit)
      }
      return res.json()
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  if (edit) {
    return (
      <div className={styles.ChangeAvatar}>
        <input placeholder='URL ending with ["png", "jpg", "gif"]' type='text' ref={avatar}/>
        <FontAwesomeIcon icon={faCheck} onClick={() => updateAvatar(avatar.current.value)}/>
        <FontAwesomeIcon icon={faTimes} onClick={() => canEdit(!edit)} />
      </div>
    )
  }
  return (
    <div className={styles.ChangeAvatar}>
      <img src={props.user.avatar} alt='User Avatar'/>
      <FontAwesomeIcon className={styles.EditIcon} icon={faEdit} onClick={() => canEdit(!edit)}/>
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
        <DeleteAccount signOut={this.props.signOut}/>
      </div>
    )
  }
}


function DeleteAccount(props) {
  const [display, setDisplay] = useState(false)

  const deleteAccount = () => {
    fetch('/settings/delete')
    .then(res => res.json())
    .then(res => {
      console.log(res.message)
      props.signOut()
    })
  }

  if (!display) {
    return (
      <div className={styles.DeleteAcount}>
        <button onClick={() => setDisplay(!display)}>Delete Account</button>
      </div>
    )
  }
  return (
    <div className={styles.DeleteAccount}>
      <button onClick={() => deleteAccount()}>Click again to delete account</button>
      <FontAwesomeIcon onClick={() => setDisplay(!display)} icon={faTimes} />
    </div>
  )
}