import styles from './HomePage.module.css'
import Navbar from './components/Navbar';
import Pomodoro from './components/Pomodoro';
import OtherPomodoros from './components/OtherPomodoros';
import React from 'react';

const axios = require('axios')


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: null,
      sessions: null,
    }
    this.fetchSettings.bind(this)
    this.fetchSessions.bind(this)
  }

  componentDidMount() {
    this.fetchSettings()
    this.fetchSessions()
  }

  fetchSettings() {
    axios.get('/settings')
    .then(res => {
      this.setState({settings: res.data.settings})
    })
  }

  // history of the day
  fetchSessions() {
    // no api for this yet
    this.setState({ 
      sessions: {
        'current': 'work',
        'work': null,
        'break': null,
        'longer_break': null 
      }
    })
  }

  render () {
    console.log(this.state)
    return (
      <>
        <Navbar user={this.props.user} signOut={this.props.signOut}/>
        <div className={styles.main}>
          <div className='wrapper'>
            {this.state.sessions && this.state.settings 
            ? <Pomodoro 
                sessions={this.state.sessions}
                settings={this.state.settings}
              />
            : <h1>Loading settings & sessions</h1>}
            <OtherPomodoros />
          </div>
        </div>
      </>
    )
  }
}


export default HomePage;