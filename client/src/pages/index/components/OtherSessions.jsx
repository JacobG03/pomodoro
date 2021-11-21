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
    this.socket.emit('req all sessions')
    this.connectSockets()
  }

  componentDidUpdate(prev) {
    if (prev.user !== this.props.user && prev.user) {
      this.socket.close()
      this.connectSockets()
      this.socket.emit('delete session', {username: prev.user.username})
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  connectSockets() {
    this.socket.open()
    this.socket.on('sync sessions', data => {
      this.setState({sessions: data})
    })
    this.socket.on('add sessions', sessions => {
      this.setState({sessions: sessions})
    })
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