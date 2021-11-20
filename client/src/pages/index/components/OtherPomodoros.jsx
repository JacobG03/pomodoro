import styles from './OtherPomodoros.module.css'
import React from 'react'


class OtherPomodoros extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={styles.otherpomodoros}>
        <h1>Other Pomodoros here</h1>
      </div>
    )
  }
}


export default OtherPomodoros;