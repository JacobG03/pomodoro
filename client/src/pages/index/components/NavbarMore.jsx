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
        <button className={styles.Logout} onClick={() => this.props.signOut()}>Sign out</button>
        <DeleteAccount signOut={this.props.signOut}/>
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
    fetch('/api/settings/username', {
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
    fetch('/api/settings/avatar', {
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
        <ChangePomodoros settings={this.props.settings} setSettings={this.props.setSettings}/>
      </div>
    )
  }
}


function ChangePomodoros(props) {
  const [edit, canEdit] = useState(false)
  const work_time = useRef(null)
  const break_time = useRef(null)
  const lbreak_time = useRef(null)
  const lbreak_interval = useRef(null)

  useEffect(() => {
    if (edit) {
      work_time.current.value = props.settings.work_time
      break_time.current.value = props.settings.break_time
      lbreak_time.current.value = props.settings.lbreak_time
      lbreak_interval.current.value = props.settings.lbreak_interval
    }
  }, [props.settings, edit])

  if (edit) {
    return (
      <div className={styles.Pomodoros}>
        <div>
          <span>Work Time:</span>
          <div>
            <input type='text' ref={work_time} />
          </div>
        </div>
        <div>
          <span>Break Time:</span>
          <div>
            <input type='text' ref={break_time} />
          </div>
        </div>
        <div>
          <span>Longer Break Time:</span>
          <div>
            <input type='text' ref={lbreak_time} />
          </div>
        </div>
        <div>
          <span>Longer Break Time Interval:</span>
          <div>
            <input type='text' ref={lbreak_interval} />
          </div>
        </div>
        <div className={styles.Edit}>
          <button onClick={() => {
            props.setSettings({
              work_time: work_time.current.value,
              break_time: break_time.current.value,
              lbreak_time: lbreak_time.current.value,
              lbreak_interval: lbreak_interval.current.value,
            })
            canEdit(!edit)
          }}>Save</button>
          <button onClick={() => canEdit(!edit)}>Cancel</button>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.Pomodoros}>
      <div>
        <span>Work Time:</span>
        <div>
          <span>{props.settings.work_time}</span>
          <FontAwesomeIcon icon={faEdit} onClick={() => canEdit(!edit)}/>
        </div>
      </div>
      <div>
        <span>Break Time:</span>
        <div>
          <span>{props.settings.break_time}</span>
          <FontAwesomeIcon icon={faEdit} onClick={() => canEdit(!edit)}/>
        </div>
      </div>
      <div>
        <span>Longer Break Time:</span>
        <div>
          <span>{props.settings.lbreak_time}</span>
          <FontAwesomeIcon icon={faEdit} onClick={() => canEdit(!edit)}/>
        </div>
      </div>
      <div>
        <span>Longer Break Time Interval:</span>
        <div>
          <span>{props.settings.lbreak_interval}</span>
          <FontAwesomeIcon icon={faEdit} onClick={() => canEdit(!edit)}/>
        </div>
      </div>
    </div>
  )
}


function DeleteAccount(props) {
  const [display, setDisplay] = useState(false)
  var timeout

  const deleteAccount = () => {
    fetch('/api/settings/delete')
    .then(res => res.json())
    .then(res => {
      console.log(res.message)
      props.signOut()
    })
  }

  // unmount code
  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    };
  }, [timeout]); 


  if (!display) {
    return (
      <button className={styles.DeleteButton} onClick={() => {
        timeout = setTimeout(() => {
          setDisplay(false)
        }, 3000)
        setDisplay(!display)
      }}>Delete Account</button>
    )
  }
  return (
    <button className={styles.DeleteButton} onClick={() => deleteAccount()}>Confirm</button>
  )
}