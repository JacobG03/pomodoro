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
    })
    .catch(error => console.log(error))
  }
  
  // Session and new component for Settings will be replaced based on which one should be rendered
  // while user is in settings he will still see the sessionTop and otherSEssions

  render () {
    return (
      <>
        <Navbar 
          user={this.props.user}
          signOut={this.props.signOut}
        />
        <div className={styles.main}>
          {this.state.settings
          ? <Pomodoros 
              settings={this.state.settings}
              user={this.props.user}
            />
          : <h1>No settings </h1>
          }
        </div>
      </>
    )
  }
}


export default HomePage;