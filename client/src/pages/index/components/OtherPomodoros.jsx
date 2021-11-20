import styles from './OtherPomodoros.module.css'
import React from 'react'
import { socket } from '../../../App'


class OtherPomodoros extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessions: []
    }
  }

  componentDidMount() {
    socket.on('add session', data => {
      if (this.props.user) {
        console.log(data)
      }
    })
  }

  componentDidUpdate() {
    console.log(this.state.sessions)
  }

  componentWillUnmount() {
    socket.disconnect()
  }

  render() {
    return (
      <div className={styles.otherpomodoros}>
        {this.state.sessions.map(session => <OtherPomodoro session={session} key={session.user.username} />)}
      </div>
    )
  }
}


class OtherPomodoro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <span>{this.props.session.user.username}</span>
      </div>
    )
  }
}


export default OtherPomodoros;