import styles from './Session.module.css'
import React from "react"
import { io } from 'socket.io-client'


class Session extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time_left: this.props.time,
      timer: null,
      width: null,
    }
    this.socket = io('https://this-pomodoro.herokuapp.com/')
    this.scaleWidth.bind(this)
    this.start.bind(this)
    this.stop.bind(this)
  }

  componentDidMount() {
    this.socket.open()
  }

  componentDidUpdate(prev) {
    // on display change -> update session, reset timer
    if (prev.display !== this.props.display) {
      clearInterval(this.state.timer)
      if (this.props.user) {
        let timestamp = new Date()
        this.socket.emit('receive session', {
          time_left: this.props.time,
          active: false,
          display: this.props.display,
          user: this.props.user,
          times: this.props.session.times,
          name: this.props.session.name,
          total_time: this.props.time,
          timestamp: timestamp.getTime() / 1000
        })
      }
      this.setState({width: '100%', time_left: this.props.time, timer: null})
    }
    // when user logs out -> reset timers
    if (prev.settings !== this.props.settings) {
      clearInterval(this.state.timer)
      this.setState({time_left: this.props.time, width: '100%', timer: null})
      return
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.state.timer)
    this.socket.close()
  }
  
  // Credits: https://stackoverflow.com/a/31687097/15760175
  scaleWidth(unscaledNum, minAllowed, maxAllowed, min, max) {
    let outcome = (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    return `${outcome}%`
  }
  
  start() {
    if (this.props.user) {
      let timestamp = new Date()
      this.socket.emit('receive session', {
        time_left: this.state.time_left,
        active: true,
        display: this.props.display,
        user: this.props.user,
        times: this.props.session.times,
        name: this.props.session.name,
        total_time: this.props.time,
        timestamp: timestamp.getTime() / 1000
      })
    }

    let timer = setInterval(() => {
      if (this.state.time_left > 0) {
        this.setState({
          time_left: this.state.time_left - 1,
          width: this.scaleWidth(this.state.time_left, 0, 100, 0, this.props.time)
        })
      } else {
        // when timer ends -> updates sessions, restarts timer
        clearInterval(this.state.timer)
        if (this.props.display === 'work') {
          if (this.props.session.times % this.props.settings.lbreak_interval) {
            this.props.setDisplay('lbreak', true)
          } else {
            this.props.setDisplay('break', true)
          }
        } else {
          this.props.setDisplay('work', true)
        }
      }
    }, 1000)
    // send session
    this.setState({timer: timer})
    return
  }

  stop() {
    clearInterval(this.state.timer)
    if (this.props.user) {
      let timestamp = new Date()
      this.socket.emit('receive session', {
        time_left: this.state.time_left,
        active: false,
        display: this.props.display,
        user: this.props.user,
        times: this.props.session.times,
        name: this.props.session.name,
        total_time: this.props.time,
        timestamp: timestamp.getTime() / 1000
      })
    }
    this.setState({timer: null})
    return
  }

  // e.g 300 -> 05:00
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
    return (
      <div className={styles.pomodoro}>
        <SessionTop 
          setDisplay={this.props.setDisplay}
          display={this.props.display}
          width={this.state.width}
          time_left={this.state.time_left}
        />
        <div className={styles.session}>
          <h1>{this.props.session.name}</h1>
          <span>{this.formatTime()}</span>
          <h4>Times: {this.props.session.times}</h4>
          {this.state.timer
          ? <button onClick={() => this.stop()}>Stop</button>
          : <button onClick={() => this.start()}>Start</button>
          }
        </div>
        <div className={styles.otherSessions}>
          <h1>Other Sessions</h1>
        </div>
      </div>
    )
  }
}


function SessionTop(props) {
  return (
    <div className={styles.top}>
      <div onClick={() => props.setDisplay('work', false)}>
        <span style={{fontWeight: props.display === 'work' ? '700' : '300'}}>
          Work
        </span>
        {props.time_left && props.display === 'work'
          ? <div className={styles.fill} style={{'width': props.width}}></div>
          : null
        }
      </div>
      <div onClick={() => props.setDisplay('break', false)}>
        <span style={{fontWeight: props.display === 'break' ? '700' : '300'}}>
          Break
        </span>
        {props.time_left && props.display === 'break'
          ? <div className={styles.fill} style={{'width': props.width}}></div>
          : null
        }
      </div>
      <div onClick={() => props.setDisplay('lbreak', false)}>
        <span style={{fontWeight: props.display === 'lbreak' ? '700' : '300'}}>
          Longer Break
        </span>
        {props.time_left && props.display === 'lbreak'
          ? <div className={styles.fill} style={{'width': props.width}}></div>
          : null
        }
      </div>
    </div>
  )
}

export default Session;