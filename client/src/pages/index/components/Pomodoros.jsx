import styles from './Pomodoros.module.css'
import React from 'react'

import Session from './Session'
import OtherPomodoros from './OtherPomodoros'


class Pomodoros extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'work',
      sessions: {
        'work': {
          'name': 'Work',
          'times': 0,
        },
        'break': {
          'name': 'Break',
          'times': 0,
        },
        'lbreak': {
          'name': 'Longer Break',
          'times': 0,
        }
      }
    }
    this.setDisplay.bind(this)
  }

  setDisplay = name => {
    this.setState({display: name})
  }

  updateStats = name => {
    let new_sessions = this.state.sessions
    new_sessions[name].times =+ 1
    this.setState({sessions: new_sessions})
    // If logged in save in database
  }
  
  render() {
    return (
      <div className='wrapper'>
        <div className={styles.main}>
          <Session 
            session={this.state.sessions[this.state.display]}
            time={this.props.settings[`${this.state.display}_time`] * 60}
            setDisplay={this.setDisplay}
            display={this.state.display}
            updateStats={this.updateStats}
          />
          <OtherPomodoros />
        </div>
      </div>
    )
  }
}

export default Pomodoros;