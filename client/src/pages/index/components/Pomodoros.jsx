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
  }
  
  render() {
    return (
      <div className='wrapper'>
        <div className={styles.main}>
          <div className={styles.pomodoros}>
            <div className={styles.top}>
              <div 
                className={styles[`${this.state.display === 'work' ? 'highlight': ''}`]}
                onClick={
                  () => this.setState({display: 'work'})
                }
              >
                <span>
                  Work
                </span>
              </div>
              <div
                className={styles[`${this.state.display === 'break' ? 'highlight': ''}`]}
                onClick={
                  () => this.setState({display: 'break'})
                }
              >
                <span>
                  Break
                </span>
              </div>
              <div 
                className={styles[`${this.state.display === 'lbreak' ? 'highlight': ''}`]}
                onClick={
                  () => this.setState({display: 'lbreak'})
                }
              >
                <span>
                  Longer Break
                </span>
              </div>
            </div>
            <Session 
              session={this.state.sessions[this.state.display]}
              time={this.props.settings[`${this.state.display}_time`] * 60}
            />
            <OtherPomodoros />
          </div>
        </div>
      </div>
    )
  }
}

export default Pomodoros;