import styles from './OtherPomodoros.module.css'
import React from 'react'
import { io } from 'socket.io-client'


class OtherPomodoros extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessions: [],
    }
    this.socket = io('http://localhost:5000/');
  }

  componentDidMount() {
    this.socket.open()
    this.connectSocket()
  }

  connectSocket() {
    this.socket.on('add sessions', sessions => {
      console.log(sessions)
      this.setState({sessions: sessions})
    })
  }

  componentWillUnmount() {
    this.socket.close();
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
        <span>{this.props.session.time_left}</span>
      </div>
    )
  }
}


export default OtherPomodoros;