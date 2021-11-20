import './App.css'
import React from 'react'
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import io from 'socket.io-client'

import RegisterPage from './pages/register/RegisterPage'
import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/index/HomePage'

const axios = require('axios')

export const socket = io('http://localhost:5000/')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
    this.signOut.bind(this)
    this.signIn.bind(this)
  }

  componentDidMount() {
    axios.get('/auth')
    .then(res => {
      this.setState({user: res.data.user})
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  signIn = user => {
    this.setState({user: user})
  }

  signOut = () => {
    axios.get('/auth/logout')
    .then(res => {
      setTimeout(() => {
        this.setState({user: null})
      }, 500)
      this.forceUpdate()
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element={
              <HomePage 
                user={this.state.user}
                signOut={this.signOut}
              />} 
          />
          <Route
            path='/login'
            element={
              <LoginPage 
                signIn={this.signIn}
              />} 
          />
          <Route 
            path='/register'
            element={
              <RegisterPage />} 
          />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;