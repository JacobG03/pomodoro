import styles from './OtherPomodoros.module.css'
import React from 'react'
import { io } from 'socket.io-client'


class OtherPomodoros extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessions: [],
    }
    this.socket = io('http://localhost:5000/');
  }

  componentDidMount() {
    this.socket.open()
    this.syncSessions()
    this.connectSocket()
  }

  syncSessions() {
    this.socket.emit('get all sessions')
    this.socket.on('sync sessions', data => {
      this.setState({sessions: data})
    })
  }

  connectSocket() {
    this.socket.on('add session', data => {
      console.log('adding sessions')
      let add = true
      for (let i = 0; i < this.state.sessions.length; i++) {
        if (this.state.sessions[i].user.username === data.user.username) {
          let new_sessions = this.state.sessions
          new_sessions[i] = data
          add = false
          this.setState({sessions: new_sessions}) 
        } 
      }
      if (add) {
        let new_sessions = this.state.sessions
        new_sessions.push(data)
        this.setState({sessions: new_sessions})
      }
    })
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className={styles.otherpomodoros}>
        {this.state.sessions.map(session => <OtherPomodoro session={session} key={session.user.username} />)}
      </div>
    )
  }
}


class OtherPomodoro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <span>{this.props.session.user.username}</span>
        <span>{this.props.session.time_left}</span>
      </div>
    )
  }
}


export default OtherPomodoros;