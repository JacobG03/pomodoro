import styles from './Session.module.css'
import React from "react"


class Session extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time_left: this.props.time,
      timer: null,
      width: null,
    }
    this.scaleWidth.bind(this)
  }
  
  componentDidUpdate(prev) {
    // When type of sessions changes (e.g work -> break)
    if (prev.time !== this.props.time) {
      this.setState({time_left: this.props.time})
      this.stop()
    }

    console.log(this.state)
  }
  
  // Credits: https://stackoverflow.com/a/31687097/15760175
  scaleWidth(unscaledNum, minAllowed, maxAllowed, min, max) {
    let outcome = (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    this.setState({width: `${outcome}%`})
  }

  start() {
    let timer = setInterval(() => {
      if (this.state.time_left > 0) {
        this.setState({time_left: this.state.time_left - 1})
        this.scaleWidth(this.state.time_left, 0, 100, 0, this.props.time)
      } else {
        // Save state, send request to api
        
      }
    }, 1000)
    this.setState({timer: timer})
  }

  stop() {
    clearInterval(this.state.timer)
    this.setState({timer: null})
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
      if (sec >= 60) {
        sec -= 60
      }
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
        <PomodoroNav 
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
        <div className={styles.otherNav}>
            <h1>Other Pomodoros</h1>
        </div>
      </div>
    )
  }
}


class PomodoroNav extends React.Component {
  render() {
    return (
      <div className={styles.top}>
        <div 
          onClick={() => this.props.setDisplay('work')}
        >
          <span style={{
            fontWeight: this.props.display === 'work' ? '700' : '300'
          }}>
            Work
          </span>
          {this.props.time_left && this.props.display === 'work'
            ? <div style={{
                'backgroundColor': 'var(--color-accent)',
                'width': this.props.width,
                'transition': 'var(--speed) ease',
                'borderTopLeftRadius': 'var(--border-radius)',
                'borderTopRightRadius': 'var(--border-radius)'
              }}>
              </div>
            : null
          }
        </div>
        <div onClick={
            () => this.props.setDisplay('break')
          }
        >
          <span style={{
            fontWeight: this.props.display === 'break' ? '700' : '300'
          }}>
            Break
          </span>
          {this.props.time_left && this.props.display === 'break'
            ? <div style={{
                'backgroundColor': 'var(--color-accent)',
                'width': this.props.width,
                'transition': 'var(--speed) ease',
              }}>
              </div>
            : null
          }
        </div>
        <div onClick={
            () => this.props.setDisplay('lbreak')
          }
        >
          <span style={{
            fontWeight: this.props.display === 'lbreak' ? '700' : '300'
          }}>
            Longer Break
          </span>
          {this.props.time_left && this.props.display === 'lbreak'
            ? <div style={{
                'backgroundColor': 'var(--color-accent)',
                'width': this.props.width,
                'transition': 'var(--speed) ease',
                'borderBottomLeftRadius': 'var(--border-radius)',
                'borderBottomRightRadius': 'var(--border-radius)'
              }}>
              </div>
            : null
          }
        </div>
      </div>
    )
  }
}

export default Session;