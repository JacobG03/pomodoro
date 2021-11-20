# Pomodoro Clock
🛠️ Difficulty Level: Beginner
🗓️ Start: November 12th
🗓️ Deadline: November 18th 16:00 (4PM) GMT

📝 Project Description
The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks - 5 minutes.

📔 User Stories
1. User can see a timer for 25 minutes - the working session
2. After the working session is over, the User can see a timer for 5 minutes - the break session
3. User can start / pause, stop and reset the timers

⭐ Bonus features (optional)
1. User can hear a sound playing when the timer hits 00:00 - denoting that the session has ended
2. User can change / customize the minutes in both sessions before starting
3. User can set a long break session of 10 minutes. This will be activated every 4th break session
4. Users can see active pomodoro sessions of other users
5. Users can share their pomodoro sessions with other users to do joint sessions


# Time spent on this project so far - *13 hours*

# Todo
## Views
- [ ] CRUD Settings
## Sockets
- [ ] Implement working socket events

* Have the 'oldest' user update new users sessions
  With each new connection receive data from the oldest user 
- [ ] Index Page connects to socketio and sets sessions state with received pomodoro sessions
  - [ ] On socketio events update sessions state
  - [ ] Display other users sessions based on state