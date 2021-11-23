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
        {this.state.sessions.map(session => 
          <OtherSession
            user={this.props.user}
            session={session}
            key={session.user.username}
        />)}
      </div>
    )
  }
}


class OtherSession extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time_left: null,
      timer: null,
      width: this.props.session.width,
      active: this.props.session.active
    }
    this.updateTime.bind(this)
  }

  componentDidMount() {
    // set time left
    this.updateTime()
    if (this.props.session.active) {
      this.start()
    }
  }

  componentDidUpdate(prev) {
    // sync time
    if (prev.session.time_left !== this.props.session.time_left) {
      this.updateTime()
    }
    // stop/start timer depending on updated 'active' state
    if (prev.session.active !== this.props.session.active) {
      if (!this.props.session.active) {
        this.stop()
      } else if (this.props.session.active) {
        this.start()
      }
      this.setState({active: this.props.session.active})
    } 
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  scaleWidth(unscaledNum, minAllowed, maxAllowed, min, max) {
    let outcome = (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    return `${outcome}%`
  }

  start() {
    let timer = setInterval(() => {
      if (this.state.time_left > 0) {
        this.setState({
          time_left: this.state.time_left - 1,
          width: this.scaleWidth(this.state.time_left, 0, 100, 0, this.props.session.total_time)
        })
      }
    }, 1000)
    this.setState({timer: timer})
    return
  }

  stop() {
    clearInterval(this.state.timer)
    this.setState({timer: null})
    return
  }

  updateTime() {
    let current = new Date()
    let time_diff = Math.abs(this.props.session.timestamp - (current.getTime() / 1000 ))
    this.setState({time_left: (this.props.session.time_left - time_diff).toFixed()})
  }

  formatTime() {
    let min = 0
    let sec = 0
    if (this.state.time_left >= 60) {
      for (let i = this.state.time_left; i >= 60; i-=60) {
        min += 1
        sec = i
      }
      // if last iteration still has a minute left
      if (sec >= 60) {
        sec -= 60
      }
    // in only seconds left 
    } else {
      min = 0
      sec = this.state.time_left
    }

    let min_str = min.toString()
    let sec_str = sec.toString()
    return `${min_str.length === 1 ? '0': ''}${min}:${sec_str.length === 1 ? '0': ''}${sec}`
  }

  render() {
    if (!this.state.time_left || this.props.user.username === this.props.session.user.username) {
      return null;
    }
    return (
      <div className={styles.session}>
        <div className={styles.top}>
          <img src={this.props.session.user.avatar} alt='User Profile' />
          <span>{this.props.session.user.username}</span>
        </div>
        <div className={styles.display}>
          <span>{this.props.session.active ? this.props.session.name: 'Paused'}</span>
            <div
              className={styles.fill}
              style={{'width': this.props.session.active ? this.state.width: '0%'}}>
            </div>
        </div>
        <span>{this.formatTime()}</span>
      </div>
    )
  }
}


export default OtherSessions;