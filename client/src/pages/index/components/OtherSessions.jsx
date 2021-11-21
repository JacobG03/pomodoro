import styles from './OtherSessions.module.css'
import React from 'react'
import { io } from 'socket.io-client'


class OtherSessions extends React.Component {
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
    this.socket.on('sync sessions', data => {
      this.setState({sessions: data})
    })
  }

  componentDidUpdate(prev) {
    if (prev.user !== this.props.user) {
      this.syncSessions()
    }
  }

  syncSessions() {
    if (this.props.user) {
      this.socket.emit('delete session', {username: this.props.user.username})
    }
    this.socket.emit('req all sessions')
  }

  connectSocket() {
    this.socket.on('add sessions', sessions => {
      this.setState({sessions: sessions})
    })
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className={styles.otherSessions}>
        {this.state.sessions.map(session => <OtherSession session={session} key={session.user.username} />)}
      </div>
    )
  }
}


class OtherSession extends React.Component {
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


export default OtherSessions;