import styles from './Navbar.module.css'
import { Link } from "react-router-dom";
import {Settings, SettingsOpen, UserOpen} from './NavbarMore';
import { useState } from 'react';


function Navbar(props) {
  const [displayUser, setDisplayUser] = useState(false)
  const [displaySettings, setDisplaySettings] = useState(false)

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
                  <Settings
                    setSettings={props.setSettings}
                    setDisplay={setDisplaySettings}
                    display={displaySettings}
                  ></Settings>
                  <div 
                    className={`${styles.avatar} ${displayUser ? styles.active: null}`}
                    onClick={() => setDisplayUser(!displayUser)}
                  >
                    <img src={props.user.avatar} alt={`${props.user.username}'s avatar`}/>
                  </div>
                  {/*<button onClick={() => props.signOut()}>Sign out</button>*/}
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
      {displayUser && props.user
      ? <div className='wrapper'>
          <UserOpen
            user={props.user}
            setDisplay={setDisplayUser}
            updateUsername={props.updateUsername}
            signOut={props.signOut}
          />
        </div>
      : null
      }
      {displaySettings && props.user
      ? <div className='wrapper'>
          <SettingsOpen settings={props.settings}
            setSettings={props.setSettings}
            setDisplay={setDisplaySettings}
          />
        </div>
      : null
      }
    </nav>
  )
}

export default Navbar;