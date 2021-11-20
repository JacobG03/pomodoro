import { 
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom'
import HomePage from './pages/index/HomePage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
// import { io } from 'socket.io-client';
import React from 'react'
// export const socket = io(process.env.REACT_APP_API || 'http://localhost:5000/');
const axios = require('axios')


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: null}
    this.signIn.bind(this)
    this.signOut.bind(this)
    this.fetchUser.bind(this)
  }

  componentDidMount() {
    this.fetchUser()
    console.log('here')
    console.log(this.state.user)
  }

  fetchUser() {
    axios.get('/auth')
    .then(res => {
      console.log(res.data.user)
      this.setState({user: res.data.user})
    })
    this.forceUpdate()
  }

  signIn = user => {
    this.setState({user: user})
  }

  signOut = () => {
    axios.get('/auth/logout')
    .then(res => {
      this.fetchUser()
    })
  }
  
  render () {
    if (!this.state.user) {
      return null;
    }
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
                user={this.state.user}
                signIn={this.signIn}
              />
            } 
          />
          <Route 
            path='/register'
            element={
              <RegisterPage />
            } 
          />
        </Routes>
      </BrowserRouter>
    )
  }
}


export default App;
