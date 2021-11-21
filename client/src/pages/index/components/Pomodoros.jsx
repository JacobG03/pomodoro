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
  }

  setDisplay = (name, update) => {
    let new_sessions = this.state.sessions;
    if (update) {
      new_sessions[this.state.display].times = this.state.sessions[this.state.display].times + 1
    }
    this.setState({display: name, sessions: new_sessions})
  }

  render() {
    return (
      <div className='wrapper'>
        <Session 
          session={this.state.sessions[this.state.display]}
          time={this.props.settings[`${this.state.display}_time`] * 60}
          setDisplay={this.setDisplay}
          display={this.state.display}
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