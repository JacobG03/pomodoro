import styles from './Navbar.module.css'
import { Link } from "react-router-dom";


function Navbar(props) {
  return (
    <nav className={styles.Nav}>
      <div className='wrapper'>
        <div className={styles.content}>
          <div className={styles.left}>
            <Link to='/'>
              <h1>{'<Pomodoro>'}</h1>
            </Link>
          </div>
            <div className={styles.right}>
              {
                props.user
                ? <>
                    <button onClick={() => props.signOut()}>Sign out</button>
                    <div className={styles.avatar}>
                      <img src={props.user.avatar} alt={`${props.user.username}'s avatar`}/>
                    </div>
                  </>
                : <>
                    <Link to='login'>
                      <button>Sign In</button>
                    </Link>
                  </>
              }
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;