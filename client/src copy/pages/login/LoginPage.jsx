import styles from './LoginPage.module.css'
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom'


function LoginPage(props) {
  
  return (
    <div className='wrapper'>
      <div className={styles.content}>
        <div className={styles.top}>
          <Link to='/'>
            <h1>{'<Pomodoro>'}</h1>
          </Link>
          <h2>Sign in</h2>
        </div>
        <LoginForm signIn={props.signIn}/>
        <div className={styles.bottom}>
          <span>Are you a new user?</span>
          <Link to='/register'>Register</Link>
        </div>
      </div>
    </div>
  )
}


export default LoginPage;