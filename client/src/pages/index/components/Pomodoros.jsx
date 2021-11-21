import React from 'react'

import Session from './Session'
import OtherSessions from './OtherSessions'


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
    this.updateStats.bind(this)
  }

  setDisplay = name => {
    this.setState({display: name})
  }

  updateStats = () => {
    let new_sessions = this.state.sessions
    new_sessions[this.state.display].times = this.state.sessions[this.state.display].times + 1
    this.setState({sessions: new_sessions})
    // If logged in save in database
  }
  
  render() {
    return (
      <div className='wrapper'>
        <Session 
          session={this.state.sessions[this.state.display]}
          time={this.props.settings[`${this.state.display}_time`] * 60}
          setDisplay={this.setDisplay}
          display={this.state.display}
          updateStats={this.updateStats}
          user={this.props.user}
          settings={this.props.settings}
        />
        <OtherSessions 
          user={this.props.user}
        />
      </div>
    )
  }
}

export default Pomodoros;