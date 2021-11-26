import styles from './RegisterForm.module.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function RegisterForm (props) {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const axios = require('axios');
  const navigate = useNavigate()

  const onSubmit = data => {
    axios.post('/api/auth/register', data)
    .then(res => {
      // account created, navigate to login page 
      navigate('/login')
      
      //TODO - display this message to user
      const msg = res.data.message
      console.log(msg)
    })
    .catch(error => {
      // display error messages from api
      console.log(error.response.data.errors)
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
          <span>Username:</span>
          <input {...register("username", {required: true})} />
          {errors.username && <span className={styles.errors}>{errors.username.message}</span>}
        </div>
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
        <div>
          <span>Repeat Password:</span>
          <input type='password' {...register("password2", { required: true })} />
          {errors.password2 && <span className={styles.errors}>{errors.password2.message}</span>}
        </div>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
}

export default RegisterForm;