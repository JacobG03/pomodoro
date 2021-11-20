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
        <div className={styles.top}>
          <h1>Other Pomodoros</h1>
        </div>
      </div>
    )
  }
}


export default OtherPomodoros;