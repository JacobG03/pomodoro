import styles from './LoginForm.module.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function LoginForm (props) {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const axios = require('axios');
  const navigate = useNavigate()

  const onSubmit = data => {
    axios.post('/api/auth/login', data)
    .then(res => {
      // get user object
      axios.get('/api/auth')
      .then(res => {
        // if user object is returned, actually sign in
        if (res.data.user) {
          props.signIn(res.data.user)
          navigate('/')
        }
      })

      //TODO - display this message to user
      const msg = res.data.message
      console.log(msg)
    })
    .catch(error => {
      // display error messages from api
      const errors = error.response.data.errors
      for (const [name, message] of Object.entries(errors)) {
        setError(name, { message })
      }
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <div>
          <span>Email:</span>
          <input placeholder='example@mail.com' {...register("email", {required: true})} />
          {errors.email && <span className={styles.errors}>{errors.email.message}</span>}
        </div>
        <div>
          <span>Password:</span>
          <input type='password' {...register("password", { required: true })} />
          {errors.password && <span className={styles.errors}>{errors.password.message}</span>}
        </div>
      </div>
      <button type='submit'>Sign In</button>
    </form>
  );
}

export default LoginForm;