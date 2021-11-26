import styles from './UnAuthOther.module.css'
import React from 'react'

import { Link } from 'react-router-dom'

import { io } from 'socket.io-client'


class UnAuthOther extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: '...'
    }
    this.socket = io('https://this-pomodoro.herokuapp.com/')
  }

  componentDidMount() {
    this.socket.open()
    this.socket.on('update active', active => {
      this.setState({active: active.amount})
    })
    this.socket.emit('get active')
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    return (
      <div className={styles.main}>
        <span>Do you want to see & share sessions?</span>
        <Link to='/login'>Sign in</Link>
        <div className={styles.info}>
          <span>Active Sessions:</span>
          <h1>{this.state.active}</h1>
        </div>
      </div>
    )
  }
}

export default UnAuthOther;