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

  componentDidUpdate() {
    console.log(this.state.sessions)
    for (let i = 0; i < this.state.sessions.length; i++) {
      console.log(this.state.sessions[i].timestamp)
    }
  }
   
  componentDidMount() {
    this.socket.open()
    this.connectSockets()
    this.socket.emit('delete session', {username: this.props.user.username})
    this.socket.emit('req all sessions')
  }

  componentWillUnmount() {
    this.socket.emit('delete session', {username: this.props.user.username})
    this.socket.removeAllListeners()
    this.socket.close();
  }

  connectSockets() {
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
    this.state = {
      time_left: null,
    }
    this.updateTime.bind(this)
  }

  componentDidMount() {
    // set time left
    this.updateTime()
  }

  componentDidUpdate(prev) {
    if (prev.session.time_left !== this.props.session.time_left) {
      this.updateTime()
    }
  }

  updateTime() {
    let current = new Date()
    let time_diff = Math.abs(this.props.session.timestamp - (current.getTime() / 1000 ))
    this.setState({time_left: (this.props.session.time_left - time_diff).toFixed()})
  }

  render() {
    if (!this.state.time_left) {
      return null;
    }
    return (
      <div className={styles.session}>
        <span>Time left: {this.state.time_left}</span>
        <span>Name: {this.props.session.name}</span>
        <span>Host: {this.props.session.user.username}</span>
        <span>Times: {this.props.session.times}</span>
      </div>
    )
  }
}


export default OtherSessions;