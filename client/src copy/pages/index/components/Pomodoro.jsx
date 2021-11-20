import styles from './Pomodoro.module.css'
import React from 'react' 


class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.current = this.props.sessions['current'];
    this.state = {
      timer: null,
      session: null
    }
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this)
    this.reset = this.reset.bind(this)
  }
  
  componentDidMount() {
    if (this.props.sessions[this.current] && this.props.sessions[this.current].times > 0) {
      this.setState(this.props.sessions.current)
    } else {
      // if session is rendered first time
      let new_state = this.state
      new_state.session = {
        'times': 0,
        'seconds': this.props.settings[`${this.current}_time`] * 60
      }
      this.setState(new_state)
    }
  }


  start = () => {
    // starts countdown
    let timer = setInterval(() => {
      let new_state = this.state
      new_state.session.seconds = new_state.session.seconds -= 1
      this.setState(new_state)
    }, 1000)

    // set timer
    let new_state = this.state
    new_state.timer = timer
    this.setState(new_state)
  }

  pause = () => {
    // pauses countdown
    clearInterval(this.state.timer)

    let new_state = this.state
    new_state.timer = null
    this.setState(new_state)
  }

  reset = () => {
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }

    let new_state = {
      timer: null,
      session: {
        times: this.state.session.times,
        seconds: this.props.settings[`${this.current}_time`] * 60
      }
    }
    this.setState(new_state)
  }

  time_formated = () => {
    let total = this.state.session.seconds
    let min = 0
    let seconds
    while(total >= 60) {
      min++
      total -= 60
    }
    min = String(min).length > 1 ? min : `0${min}`
    seconds = String(total).length > 1 ? total : `0${total}`

    return `${min}:${seconds}`
  }

  render() {
    return (
      <div className={styles.content}>
        {this.state.session
        ? <>
            <span>{this.current.toUpperCase()}</span>
            <span>{this.time_formated()}</span>
          </>
        : <span>Loading session</span>
        }
        {
          this.state.timer
          ?
          <button onClick={() => this.pause()}>Stop</button>
          :
          <button onClick={() => this.start()}>Start</button>
        }
        <button onClick={() => this.reset()}>Reset</button>
      </div>
    )
  }
}


export default Pomodoro;