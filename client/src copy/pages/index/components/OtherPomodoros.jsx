import styles from './OtherPomodoros.module.css'
import { useState, useEffect } from 'react';



function OtherPomodoros(props) {
  const sessions = props.sessions
  
  return (
    <div className={styles.content}>
      <h1>Other Pomodoros</h1>
      <span>(on click scroll down)</span>
      {sessions ? sessions.map((session, i) => <OtherPomodoro session={session} key={i} />): null}
    </div>
  )
}


function OtherPomodoro(props) {
  console.log(props.session)
  return (
    <h1>{props.session.seconds}</h1>
    )
  }
  
export default OtherPomodoros;
  
  
// have the scroll down button be on the bottom of the page
// when user scrolls down let it be at the top
// good reuse of the same element and ...
// ... a clean & easy transition