import styles from './HomePage.module.css'
import React from 'react';

import Navbar from './components/Navbar';
import Pomodoros from './components/Pomodoros';

const axios = require('axios')


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: null
    }
  }

  componentDidMount() {
    this.fetchSettings()
  }

  componentDidUpdate(prev) {
    if (prev.user !== this.props.user)
      this.fetchSettings()
  }

  fetchSettings() {
    axios.get('/settings')
    .then(res => {
      this.setState({settings: res.data.settings})
      console.log(this.state.settings)
    })
    .catch(error => console.log(error))
  }

  render () {
    return (
      <>
        <Navbar 
          user={this.props.user}
          signOut={this.props.signOut}
        />
        {this.state.settings
        ? <Pomodoros 
            settings={this.state.settings}
            user={this.state.user}
          />
        : <span>Loading pomodoros settings</span>
        }
      </>
    )
  }
}


export default HomePage;