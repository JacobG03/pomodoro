import styles from './Session.module.css'
import React from "react"


class Session extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time_left: this.props.time,
      timer: null,
    }
  }
  start() {
    let timer = setInterval(() => {
      this.setState({time_left: this.state.time_left - 1})
    }, 1000)
    this.setState({timer: timer})
  }

  stop() {
    clearInterval(this.state.timer)
    this.setState({timer: null})
  }

  componentDidUpdate(prev) {
    // When type of sessions changes (e.g work -> break)
    if (prev.time !== this.props.time) {
      this.setState({time_left: this.props.time})
      this.stop()
    }
  }
  
  // e.g 300 -> 05:00
  formatTime() {
    let min = 0
    let sec
    for (let i = this.state.time_left; i >= 60; i-=60) {
      min += 1
      sec = i
    }
    sec -= 60
    return `${min === 0 ?'0': ''}${min}:${sec === 0 ? '0': ''}${sec}`
  }

  render() {
    return (
      <div className={styles.session}>
        <h1>{this.props.session.name}</h1>
        <span>{this.formatTime()}</span>
        <h4>Times: {this.props.session.times}</h4>
        {this.state.timer
        ? <button onClick={() => this.stop()}>Stop</button>
        : <button onClick={() => this.start()}>Start</button>
        }
      </div>
    )
  }
}

export default Session;