import styles from './RegisterPage.module.css'
import RegisterForm from './components/RegisterForm';
import { Link } from 'react-router-dom'


function RegisterPage() {
  
  return (
    <div className='wrapper'>
      <div className={styles.content}>
        <div className={styles.top}>
          <Link to='/'>
            <h1>{'<Pomodoro>'}</h1>
          </Link>
          <h2>Sign up</h2>
        </div>
        <RegisterForm />
        <div className={styles.bottom}>
          <span>Are you already a user?</span>
          <Link to='/login'>Sign in</Link>
        </div>
      </div>
    </div>
  )
}


export default RegisterPage;